/**
 * when you go on website the first file getting fetched would be index.html.
 *
 * client <-------> server
 *
 * client sends request to server.
 * server sends response to client.
 *
 * server is a machine(can be a simple computer). for high processing and avaialbilty we
 * get the best machines and serve responses from there
 *
 * to connect with other machines on net you need ip address.
 *
 * so lets say i have a name linkedin.in. to get resource from linkedin server
 * first i would need the ip of machine hosting linkedin.in
 *
 * for that my device will request to dns(domain name server) server.
 *
 * dns server will give me the ip address of the machine hosting linkedin.in
 *
 * now my device will request to that ip address and reach that machine having linkedin.in
 * and get the response of index.html file.
 *
 * now my device will render the index.html file and display the website.
 */

/**
 * so as you get index.html file. the link tag in index.html will fetch other files like css, js, images, etc.
 *
 * So now you get Get the Css and Get the Js files.
 *
 * till you dont get css files your rendering is blocked(no point of creating rendertree without CSSOM).
 * till You dont get JS files Your parsing is blocked(there wre ways to make non blocking. async and defer).
 *
 * (Note: Rendering is the entire process of displaying content
 * Painting is the final step where visual styles are applied to the laid-out elements
 *
 * Rendering steps are:
 * 1. DOM construction
 * 2. CSSOM creation
 * 3. Render tree formation
 * 4. Layout calculations
 * 5. Painting
 * )
 *
 * now with html we get the DOM tree is made. (step 1 of rendering)
 * now after that css is parsed and cssom is made. (step 2 of rendering)
 *
 * now the javascript execution takes place.
 * script is loaded nd parsed(main thread is blocked).
 * AST(Abstract Syntax Tree) internalization happens.
 * the code is then compiled into bytecode.
 * and execution happens.
 *
 * merge DOM and CSSOM to form Render Tree. (step 3 of rendering)
 *
 * now layout calculations are done. (step 4 of rendering) (layout tree)
 *
 * now painting is done. (step 5 of rendering) (painting tree)
 *
 * Now compositing is done; different layers are combined to form the final image.
 * (Step 6 of rendering) (compositing tree)
 * An example of having different z-index:
 * The browser will create separate layers for:
 * - Elements with position: absolute
 * - Elements with transform: translateZ(0) (hardware acceleration)
 * - Elements with will-change property:
 *
 * const cardStyle = {
 *   padding: '20px',
 *   backgroundColor: '#fff',
 *   borderRadius: '8px',
 *   transform: isHovering ? 'scale(1.05)' : 'scale(1)',
 *   transition: 'transform 0.3s ease',
 *   // Telling browser to prepare for transform changes
 *   willChange: isHoverable ? 'transform' : 'auto',
 * };
 *
 * The will-change property tells the browser to keep this property hardware accelerated.
 *
 * Now the pixels are colored and displayed on the screen.
 */
