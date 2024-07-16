import $ from "jquery";
export default function () {
  $(document).on('click', ' .edit-contact__item', function (e) {
    const target = e.target
    const open = $(this).find('.edit-contact__change')
    const cancel = $(this).find('.edit-contact__change.js-edit-contact-cancel')
    const content = $(this).find('.edit-contact__body')
    const itIsOpener = $(target).closest('.js-edit-contact-change')
    if (itIsOpener && itIsOpener.length) {
      content.removeClass('hide')
      open.addClass('hide')
      cancel.removeClass('hide')
    }
    const itIsCanceler = $(target).closest('.js-edit-contact-cancel')
    if (itIsCanceler && itIsCanceler.length) {
      content.addClass('hide')
      open.removeClass('hide')
      cancel.addClass('hide')
    }
  })


  $('.js-edit-about-open').on('click', function (e) {
    const text = $('.edit-about__text')
    const content = $('.edit-about__body')
    const open = $('.js-edit-about-open')
    const cancel = $('.js-edit-about-cancel')
    const more = $('.edit-about__more')
    text.toggleClass('hide')
    content.toggleClass('hide')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
    more.toggleClass('hide')
  })
  $('.edit-about__cancel, .js-edit-about-cancel').on('click', function (e) {
    const text = $('.edit-about__text')
    const content = $('.edit-about__body')
    const open = $('.js-edit-about-open')
    const cancel = $('.js-edit-about-cancel')
    const more = $('.edit-about__more')
    text.toggleClass('hide')
    content.toggleClass('hide')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
    more.toggleClass('hide')
  })


  $('.js-edit-requisites-open').on('click', function (e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })
  $('.js-edit-requisites-cancel').on('click', function (e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })

  function getAverageColor(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const imageData = context.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return { r, g, b };
  }

  function isColorDark({ r, g, b }) {
    // Calculate the luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  }

  function generateFileItem(id) {
    return `
      <div class="dropfile__item active" id="${id}">
        <label class="dropfile__add">
          <input type="file" name="" id="" accept=".png, .jpg, .jpeg, .pdf" hidden>
          <svg>
            <use xlink:href="img/sprites/sprite.svg#plus"></use>
          </svg>
        </label>
        <div class="dropfile__img">
          <img src="" alt="">
        </div>
        <div class="dropfile__delete">
          <svg>
            <use xlink:href="img/sprites/sprite.svg#trash"></use>
          </svg>
        </div>
        <div class="dropfile__info">
          <div class="dropfile__icon">
            <svg>
              <use xlink:href="img/sprites/sprite.svg#picture"></use>
            </svg>
          </div>
          <div class="dropfile__name-wrap">
            <div class="dropfile__name"></div>
            <div class="dropfile__size"></div>
          </div>
        </div>
      </div>
    `;
  }

  $(document).on('change', '.dropfile__item.active input', handleFileInput)
  $(document).on('click', '.dropfile__item.show .dropfile__delete', removeFileInput)

  $('.veri__link').on('click', showFileList)
  $('.veri__subtitle').on('click', toggleChange)

  const dropZone = document.querySelector('.veri__inner--draganddrop');


  dropZone ? dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.classList.add('highlight');
  }) : null;

  // Unhighlight drop zone on drag leave
  dropZone ? dropZone.addEventListener('dragleave', function (e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');
  }) : null;

  dropZone ? dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');

    const files = e.dataTransfer.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      handleFileInput(null, element);
    }
    showFileList();
  }) : null;

  function handleFileInput(e, drop) {
    const list = $('.dropfile__list');
    const item = e ? $(this).closest('.dropfile__item') : $('.dropfile__item.active');
    const input = e ? $(this) : $('.dropfile__item.active input');
    const imgWrap = item.find('.dropfile__img');
    const img = item.find('.dropfile__img img');
    const name = item.find('.dropfile__name');
    const size = item.find('.dropfile__size');
    const id = Date.now();

    const value = drop ? 'drop' : e.target.value;

    if (value.trim() === '') {
      return;
    }

    const file = drop ? drop : e.target.files[0];
    if (file) {
      if (file.type.match('image.*') || file.type === 'application/pdf') {

        item.addClass('show');
        item.removeClass('active');
        // Display the file name
        name.text(file.name);

        // Convert file size to KB and display it
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        size.text(fileSizeInKB + ' KB');

        input.attr('name', id);
        input.attr('id', id);
      }
      if (file.type.match('image.*')) {
        // Read and display the image
        const reader = new FileReader();
        reader.onload = function (e) {
          const pic = new Image();
          pic.src = e.target.result;
          pic.onload = function () {
            img.attr('src', e.target.result);
            const avgColor = getAverageColor(pic);
            const isDark = isColorDark(avgColor);
            name.css('color', isDark ? 'white' : 'black');
            size.css('color', isDark ? 'white' : 'black');
          };
        };
        reader.readAsDataURL(file);

        list.append($(generateFileItem('id-' + Date.now())))

      } else if (file.type === 'application/pdf') {
        list.append($(generateFileItem('id-' + id)))
        imgWrap.text('PDF')
        item.addClass('pdf');
        name.css('color', 'black');
        size.css('color', 'black');
      } else {
        alert('Пожалуйста, выберите допустимое изображение или PDF-файл.');
      }
    }
    isReadyToSend()
  }

  function removeFileInput(e) {
    const item = $(this).closest('.dropfile__item');
    item.remove()

    isReadyToSend()
  }

  function showFileList(e) {
    const text = $('.veri__text--greeting');
    text.addClass('hide')
    $('.veri__labels').removeClass('hide')
  }

  function toggleChange(e) {
    $('.veri__inner--draganddrop').removeClass('hide')
    $('.veri__inner--verified').addClass('hide')
  }

  function isReadyToSend() {
    const btn = $('.js-send-profile-docs');
    $('.dropfile__item').length > 1 ? btn.attr('disabled', false) : btn.attr('disabled', true);
  }

  function performAction() {
    // Replace this with your desired action
    console.log('Action performed!');
  }

  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    $(document).on('click', '.dropfile__item.show', function() {
      $('.dropfile__item.show').removeClass('hover')
      $(this).addClass('hover')
    })
  } else {
    $(document).on('mouseenter', '.dropfile__item.show', function() {
      $(this).addClass('hover')
    })
    $(document).on('mouseleave', '.dropfile__item.show', function() {
      $('.dropfile__item.show').removeClass('hover')
    })
  }


  $(document).click(function(event) {
    if (
      !$(event.target).closest('.dropfile__item.show').length
    ) {
      $('.dropfile__item.show').removeClass('hover')
    }
  });

}