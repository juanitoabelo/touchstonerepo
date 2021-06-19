/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions;

//   if (page.path.match(/auth/)) {
//     page.context.layout = 'auth';
//     createPage(page);
//   }
// };
exports.onCreatePage = async ({ page, actions }) => {


  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.

  const path = page.context.layout;
  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = "/dashboard/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/my-company/)) {
    page.matchPath = "/my-company/*"
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/logout/)) {
    page.matchPath = "/logout/*"
    // Update the page.
    createPage(page)
  }

  // if (page.path.match(/^\/user/)) {
  //   page.matchPath = "/user/*"
  //   // Update the page.
  //   createPage(page)
  // }
  // if (page.path.match(/^\/add-user/)) {
  //   page.matchPath = "/add-user/*"
  //   // Update the page.
  //   createPage(page)
  // }

}