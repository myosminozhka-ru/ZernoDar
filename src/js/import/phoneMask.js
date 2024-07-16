export default function (selector) {
  const inputs = document.querySelectorAll(selector);
  const instances = [];
  inputs.forEach((el) => {
    instances.push(IMask(el, { mask: "+{7 }000-000-00-00" }));
  });

  return instances;
}
