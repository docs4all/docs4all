document.addEventListener("DOMContentLoaded", function () {
  const menuElement = document.getElementById('sidebar');
  const menu = new SlideMenu(menuElement, {
    position:"left",
    submenuLinkAfter: ' ⮞',
    backLinkBefore: '⮜ '
  });
  menu.open();
});
