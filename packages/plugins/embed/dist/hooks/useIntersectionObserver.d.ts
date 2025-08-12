/**
 *
 * @param {DOM Ref} elementRef - DOM ref for checking the intersection
 * @param {Observer Params} - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @returns {IntersectionObserverEntry} - https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
 */
export declare function useIntersectionObserver(elementRef: any, { threshold, root, rootMargin, freezeOnceVisible }?: {
    threshold?: number | undefined;
    root?: null | undefined;
    rootMargin?: string | undefined;
    freezeOnceVisible?: boolean | undefined;
}): IntersectionObserverEntry;
//# sourceMappingURL=useIntersectionObserver.d.ts.map