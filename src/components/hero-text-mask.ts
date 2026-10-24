const SVG_NS = "http://www.w3.org/2000/svg";
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 248;
const SCALE = 1;
const FRAME_INTERVAL = 1000 / 24; // ~24fps
const SCROLL_DEBOUNCE = 250;

export class HeroTextMask {
  private video: HTMLVideoElement;
  private element: HTMLElement;
  private textElement: HTMLElement;
  private textElementOffsetTop: number;
  private text: string;
  private movieHeight = 0;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private screenLayer!: HTMLDivElement;
  private svgMask: SVGSVGElement;

  private isPlaying = false;
  private lastDrawDate = 0;
  private rafId = 0;

  /**
   * @param text The headline word, passed in from React. Never read it back out
   * of the DOM: once the mask is injected the element holds markup, and a
   * re-mount would then render that markup as the headline.
   */
  constructor(element: HTMLElement, video: HTMLVideoElement, text: string) {
    this.element = element;
    this.video = video;
    this.text = text;

    // Hide video element — canvas will render its frames instead
    this.video.style.display = "none";

    this.textElement = element.querySelector(".text-mask") as HTMLElement;
    this.textElementOffsetTop =
      this.textElement.getBoundingClientRect().top + window.scrollY;

    this.svgMask = this._createSvgTextMask();

    this._onCanPlayThrough = this._onCanPlayThrough.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._draw = this._draw.bind(this);

    // Show the headline straight away, filled with the poster image. The video
    // is 8 MB and may be slow or blocked; without this the hero is an empty
    // black box until it loads.
    this._revealHeadline();

    // The original serves the still poster fill to anyone asking for reduced
    // motion, and never starts the moving mask for them.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    if (this.video.readyState >= 4) {
      this._onCanPlayThrough();
    } else {
      this.video.addEventListener("canplaythrough", this._onCanPlayThrough);
    }

    window.addEventListener("resize", this._onResize);
    window.addEventListener("scroll", this._onScroll);
  }

  /** Fades the headline in and slides it up to its resting position. */
  private _revealHeadline(): void {
    window.setTimeout(() => {
      // The starting offset comes from the `translate-y-[25px]` class, and
      // Tailwind v4 compiles that to the standalone `translate` property, NOT
      // to `transform`. Clearing `transform` therefore did nothing: the
      // headline only faded, and stayed 25px below its centred wrapper for the
      // life of the page. Clear `translate` — the property actually holding
      // the offset — and animate that.
      this.element.style.transition =
        "opacity 1.2s ease 0.1s, translate 1.2s ease 0.1s, transform 1.2s ease 0.1s";
      this.element.style.opacity = "1";
      this.element.style.translate = "0 0";
      this.element.style.transform = "translate3d(0, 0, 0)";
    }, 0);
  }

  private _onCanPlayThrough(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Show video now that playback is ready
    this.video.style.display = "block";
    this.movieHeight = this.video.offsetHeight;

    this.canvas = this._createBackgroundCanvas();
    this.ctx = this.canvas.getContext("2d")!;
    this._updateBackgroundCanvasSize();

    this.screenLayer = this._createScreenLayer();
    this._injectMaskedText();
    this._fadeInMaskedText();

    this.rafId = requestAnimationFrame(this._draw);
  }

  private _createBackgroundCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(CANVAS_WIDTH / SCALE);
    canvas.height = Math.round(CANVAS_HEIGHT / SCALE);
    canvas.style.width = this.video.clientWidth + "px";
    canvas.style.height = CANVAS_HEIGHT + "px";
    canvas.classList.add("text-mask-canvas-background");
    return canvas;
  }

  private _createScreenLayer(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("text-mask-screen");
    return div;
  }

  private _createSvgTextMask(): SVGSVGElement {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.classList.add("text-mask-svg");

    const clipPath = document.createElementNS(SVG_NS, "clipPath");
    clipPath.setAttribute("id", "text-mask-svg-path");

    const text = document.createElementNS(SVG_NS, "text");
    text.classList.add("text-mask-svg-content");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.textContent = this.text;

    clipPath.appendChild(text);
    svg.appendChild(clipPath);
    return svg;
  }

  private _updateBackgroundCanvasSize(): void {
    this.textElementOffsetTop =
      this.textElement.getBoundingClientRect().top + window.scrollY;
    if (this.canvas) {
      this.canvas.style.width = this.video.clientWidth + "px";
    }
  }

  private _injectMaskedText(): void {
    this.textElement.textContent = "";
    this.textElement.setAttribute("aria-label", this.text);
    // DOM order: [screenLayer] [canvas] [svgClipPath]
    this.textElement.insertBefore(this.canvas, this.textElement.firstChild);
    this.textElement.insertBefore(this.screenLayer, this.textElement.firstChild);
    this.textElement.appendChild(this.svgMask);
    // The clip-path only works once the <clipPath> above is in the document
    this.textElement.classList.add("is-masked");
  }

  private _fadeInMaskedText(): void {
    // The plain headline is already on screen; only the video layers fade in,
    // so swapping to the masked version never flashes an empty hero.
    for (const layer of [this.screenLayer, this.canvas]) {
      layer.style.opacity = "0";
      layer.style.transition = "opacity 0.6s ease";
    }

    requestAnimationFrame(() => {
      this.screenLayer.style.opacity = "1";
      this.canvas.style.opacity = "0.8"; // matches .text-mask-canvas-background
    });
  }

  private _onScroll(): void {
    // Debounce: push lastDrawDate 250ms ahead to pause canvas draws during scroll
    this.lastDrawDate = performance.now() + SCROLL_DEBOUNCE;
  }

  private _draw(): void {
    const now = performance.now();
    if (now - this.lastDrawDate >= FRAME_INTERVAL) {
      this.lastDrawDate = now;

      const sourceX = 0;
      const sourceY = this.textElementOffsetTop;
      const sourceWidth = CANVAS_WIDTH;
      const sourceHeight = CANVAS_HEIGHT;
      const destX = 0;
      const destY = 0;
      const destWidth = CANVAS_WIDTH / SCALE;
      const destHeight = CANVAS_HEIGHT / SCALE;

      this.ctx.drawImage(
        this.video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight,
      );
    }
    this.rafId = requestAnimationFrame(this._draw);
  }

  private _onResize(): void {
    this._updateBackgroundCanvasSize();
  }

  destroy(): void {
    cancelAnimationFrame(this.rafId);
    this.video.removeEventListener("canplaythrough", this._onCanPlayThrough);
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("scroll", this._onScroll);

    // Put the headline back the way it was found, so a re-mount starts clean
    // instead of building a mask on top of a mask.
    this.textElement.classList.remove("is-masked");
    this.textElement.removeAttribute("aria-label");
    this.textElement.textContent = this.text;
    this.video.style.display = "";
  }
}
