/**
 * in browser we have browser performing HTML parsing. and
 * script fetching and execution steps
 * 
 * <script href="awez_code"/>
 * 
 * <--HTML Parsing-->																			<--HTML Parsing-->
 * 									<--Script fetch--><--Script Execute-->
 * 
 * <script async href="awez_code" />
 * 
 * async doesnt guarantee script execution order as fetch time can be different
 * for different scripts
 * 
 *  <-----HTML Parsing--->									 <--HTML Parsing-->
 * 			<--Script fetch--><--Script Execute-->
 * 
 * <script defer href="awez_code" />
 * 
 * order of execution is maintained.
 * 
 *   <---------------HTML Parsing----------->
 * 			      <--Script fetch-->             <--Script Execute-->
 */