import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** React Router keeps the window scroll across navigations; a card tapped
 *  low in the grid would open the project page pre-scrolled past its top.
 *  This resets to the top on every pathname change. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
