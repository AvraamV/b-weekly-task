(function ($) {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  $(document).ready(function () {
    $('.preloader').fadeOut(1000);

    if ($('[data-fancybox]').length > 0) {
      Fancybox.bind('[data-fancybox]');
    }

    if ($('.blog-page .rotated-elem').length > 0) {
      $('.blog-page .rotated-elem').removeClass('d-none');
      $('.blog-page .rotated-elem').appendTo('.rotated-parent');
    }

    if ($('.header-white-bg').length > 0) {
      $('.header').addClass('header-white-bg');
    }

    if ($('.contact-page').length > 0) {
      $('.footer').addClass('contact-page');
    }
    
    if (window.matchMedia('(min-width: 1025px)').matches) {
      $('.chefs-grid').masonry({
        itemSelector: '.chef-item'
      });
    };

    //delete
    $('.list-of-pages h2').on('click', function () {
      $(this).toggleClass('isActive');
      $(this).next().slideToggle();
    });

    //funcitons init
    fixedHeaderActions();
    anchorDetect();
    slidersInit();
    menuActions();
    tableOfContentsFromH2();
    courseNavigation();
    tabsSwitcher('.ways-switcher button', '.contact-main-content', '.way-tab');

    wrapWordsAndLettersInSpan('.home-title');
    wrapLettersInSpan('.graduate-item .name');

    accordionInit('.courses-faq .item','h3')

    moveElem('.course-main-form', '.course-form-mob-wrapper', '.course-main');

    filterItems('.courses-faq .actions-btns button', '.courses-faq .item');
  });

  //slider each
  const customSlider = () => {
    let sliders = document.querySelectorAll('.custom-slider');
    let prevArrow = document.querySelectorAll('.custom-btn-prev');
    let nextArrow = document.querySelectorAll('.custom-btn-next');
    sliders.forEach((slider, index) => {
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        navigation: {
          nextEl: nextArrow[index],
          prevEl: prevArrow[index],
        },
        speed: 1000,
      });
    })
  }
  window.addEventListener('load', customSlider)

  //graduates slider init
  const graduatesSlider = () => {
    let sliders = document.querySelectorAll('.graduates-slider');
    let prevArrow = document.querySelectorAll('.graduates-btn-prev');
    let nextArrow = document.querySelectorAll('.graduates-btn-next');
    sliders.forEach((slider, index) => {
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        navigation: {
          nextEl: nextArrow[index],
          prevEl: prevArrow[index],
        },
        speed: 1000,
      });
    })
  }
  window.addEventListener('load', graduatesSlider)

  $(window).on('load', function () {
    if ($('[data-aos]').length > 0) {
      AOS.init({
        delay: 100,
        duration: 1000,
      });
    }
  });

  $(window).on('scroll', function () {
    fixedHeaderActions();
  });

  $(window).on('resize', function () {
    moveElem('.course-main-form', '.course-form-mob-wrapper', '.course-main');
  });

  //general functions
  function slidersInit() {
    if ($('.chefs-slider').length > 0) {
      new Swiper('.chefs-slider', {
        speed: 1000,
        slidesPerView: 'auto',
        initialSlide: 1,
        breakpoints: {
          1025: {
            grid: {
              rows: 2,
            },
          }
        }
      });
    }
  }

  let scrollPrev;

  function fixedHeaderActions() {
    let header = $('.header');
    let scrolled = $(window).scrollTop();
    if (scrolled > 50) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    if (scrolled > 100 && scrolled > scrollPrev) {
      header.addClass('anim');
    } else {
      header.removeClass('anim');
    }
    scrollPrev = scrolled;
  }

  function anchorDetect() {
    $(document).on('click', '.anchor', function (e) {
      e.preventDefault();
      let link = $(this).attr('href');
      let top = $(link).offset().top - 100;
      $('body,html').animate({
        scrollTop: top
      }, 1000);
    });
  };

  function menuActions() {
    $('.burger-btn').on('click', function (e) {
      e.preventDefault();
      $('.burger-btn').toggleClass('isActive');
      $('body').toggleClass('fixed');
      $('.menu-wrapper').toggleClass('isActive');
      $('.header').toggleClass('menu-opened');
      $('.overlay').fadeToggle();
    });

    $('.overlay').on('click', function (e) {
      e.preventDefault();
      $('.burger-btn').removeClass('isActive');
      $('body').removeClass('fixed');
      $('.menu-wrapper').removeClass('isActive');
      $('.header').removeClass('menu-opened');
      $('.overlay').fadeOut();
    });

  }
  
  $('.menu-item-has-children > a').on('click', function (e) {
    e.preventDefault();
    $(this).next().slideToggle();
    $(this).toggleClass('opened');
  });

  function moveElem(selector, destination, home) {
    if ($(selector).length == 0) return false;
    if (window.matchMedia('(max-width: 1024px)').matches) {
      $(selector).appendTo(destination);
    } else {
      $(selector).appendTo(home);
    }
  }

  function accordionInit(item, button) {
    let elem = $(item);
    let btn = elem.find(button);
    btn.on('click', function () {
      if ($(this).hasClass('isActive')) {
        $(this).removeClass('isActive');
        $(this).next().slideUp();
      } else {
        btn.removeClass('isActive');
        btn.next().slideUp();
        $(this).addClass('isActive');
        $(this).next().slideDown();
      }
    });
  }

  function tableOfContentsFromH2() {
    let h2 = $('.article-content h2');
    let h2Arr = [];
    let content = $('.table-of-content ul');
    let titles = [];
    if (h2.length > 0) {
      h2.each(function (index) {
        $(this).attr('id', 'title-' + index);
        let id = $(this).attr('id');
        let text = $(this).text();
        if ($.inArray(text, titles) === -1) {
          titles.push(text);
          h2Arr.push({
            id: id,
            text: text
          });
        }
      });
      h2Arr.forEach(function (item) {
        content.append('<li><a href="#' + item.id + '" class="anchor">' + item.text + '</a></li>');
      });
    } else {
      $('.table-of-content').remove();
    }
    if (window.matchMedia('(max-width: 1024px)').matches) {
      $('.table-of-content h3').on('click', function () {
        $(this).toggleClass('open');
        $(this).next().slideToggle();
      });
    }
  }

  function courseNavigation() {
    let h2 = $('.course-main-content h2');
    let h2Arr = [];
    let content = $('.course-main-navigation .swiper-wrapper');
    let titles = [];
    if (h2.length > 0) {
      h2.each(function (index) {
        $(this).attr('id', 'title-' + index);
        let id = $(this).attr('id');
        let text = $(this).text();
        if ($.inArray(text, titles) === -1) {
          titles.push(text);
          h2Arr.push({
            id: id,
            text: text
          });
        }
      });
      h2Arr.forEach(function (item) {
        content.append('<div class="swiper-slide"><a href="#' + item.id + '" class="navigation-item anchor">' + item.text + '</a></div>');
      });

      new Swiper('.course-main-navigation', {
        speed: 1000,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.course-main-navigation-btn-next',
          prevEl: '.course-main-navigation-btn-prev',
        },
      });
    } else {
      $('.course-main-navigation').remove();
    }
  }

  function wrapWordsAndLettersInSpan(elem) {
    const sentence = $(elem).text();
    const words = sentence.split(' ');
    const wrappedWords = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let wrappedWord = '';
      for (let j = 0; j < word.length; j++) {
        const spanAttributes = i % 2 === 0 ? 'fade-down' : 'fade-up';
        wrappedWord += `<span data-aos="${spanAttributes}" data-aos-delay="${j+1}00">${word[j]}</span>`;
      }
      wrappedWords.push(`<span>${wrappedWord}</span>`);
    }
    const wrappedSentence = wrappedWords.join(' ');
    $(elem).html(wrappedSentence);
  }

  function wrapLettersInSpan(elem) {
    $(elem).each(function (e) {
      let text = $(this).text();
      let wrappedText = $.map(text.split(''), function(letter) {
        return '<span>' + letter + '</span>';
      }).join('');
      $(this).html(wrappedText);
    })
  }

  function filterItems(button, items) {
		$(button).on('click', function (e) {
			e.preventDefault();
			let filterOption = $(this).data('id');
			$(button).removeClass('active');
			$(this).addClass('active');

			if ($(this).hasClass('all')) {
				$(items).fadeIn();
				$(items).addClass('show');
			} else {
				$(items).hide();
				$(items).removeClass('show');
				$(items).each(function (e) {
					let filterValue = $(this).data('tax-id');
					let filterValueLength = filterValue.length

					if (filterValueLength > 2) {
						let filterValues = $(this).data('tax-id').split(',');
						let i;
						for (i = 0; i < filterValues.length; ++i) {
							if (filterValues[i] == filterOption) {
								$(this).fadeIn();
								$(this).addClass('show');
							}
						}
					} else {
						if (filterValue == filterOption) {
							$(this).fadeIn();
							$(this).addClass('show');
						}
					}
				});
			}

			initMap();
		});
  }
  
  function tabsSwitcher(button, wrapper, tabs) {
    let tabsBtn = $(button);
    tabsBtn.on('click', function () {
      let index = $(this).index();
      let tabsContent = $(this).parents(wrapper).find(tabs);
      tabsBtn.removeClass('active');
      $(this).addClass('active');

      tabsContent.hide();
      tabsContent.eq(index).fadeIn();
    });
  }

})(jQuery);