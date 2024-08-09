import $ from "jquery";

export default function() {
  let indexOfRow = 0;
  const row = $('.js-add-ann-new-row-block .js-add-ann-new-row-clone').eq(0);
  const putPlace = $(".js-add-ann-new-row-block .js-add-ann-new-row-before")

  $(".js-add-ann-new-row-block .js-add-ann-new-row-button").on('click', function() {
    indexOfRow = indexOfRow + 1;
    const clonedRow = row.clone();
    const inputs = $(clonedRow).find("select, input, textarea");
    inputs.each(function (idx, element) {
      const el =  $(element);
      let id = el.attr("id");
      id = id.slice(0, -1) + indexOfRow;
      el.attr("id", id);
      el.attr("name", id);
    })
    putPlace.before(clonedRow);
    $(clonedRow).find(".js-add-ann-new-row-remove").on('click', removeRow)
  })

  function removeRow() {
    $(this).parent(".js-add-ann-new-row-clone").remove()
  }


}