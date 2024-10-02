/**
 * This Tells Page Performance by using some metric.
 *
 * CLS --> Cumulative layout shift
 * LCP --> Largest Contentful paint
 * FID --> First Input Delay
 *
 * CLS make the UI unpredictibale for user. lets say they are trying to click
 * a cta and suddenly layout shifts and they click something
 *
 * LCP how long does the largest part on your page takes to get rendered.
 * generally in some sites its the banner
 *
 * FID if a user clicks on element how long it takes to run that click
 * function on main thread
 * dont write thread blocking code do decrease this value.
 */
