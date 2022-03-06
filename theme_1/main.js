document.addEventListener("DOMContentLoaded", function () {
  const menuElement = document.getElementById('example-menu');
  const menu = new SlideMenu(menuElement, {
    position:"left",
    submenuLinkAfter: ' ⮞',
    backLinkBefore: '⮜ '
  });
  menu.open();
});
