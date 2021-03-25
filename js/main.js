const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener ('scroll', animOnScroll);
    function animOnScroll(){
        for (let i = 0; i < animItems.length; i++){
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active');
            }
            else {
                if (!animItem.classList.contains("_anim-no-hide")){  //Не анімується при скролі вгору
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}

AOS.init();

window.addEventListener('load', () => {

    /*-------------------------------------------------------------------------------------*/

    const mainCarousel = Array.from(document.querySelectorAll('.main-carousel'))

    mainCarousel.forEach(item => {
        let containerMain = item.querySelector('.main-carousel__wrap')
        let containerThumb = item.querySelector('.main-carousel__thumb')
        // let navPrev = item.querySelector('.main-carousel__nav._prev')
        // let navNext = item.querySelector('.main-carousel__nav._next')
        let pagination = item.querySelector('.main-carousel__pagination')

        let thumbs = new Swiper(containerThumb, {
            wrapperClass: 'main-carousel__thumb-list',
            slideClass: 'main-carousel__thumb-item',
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 600,
            roundLengths: true,
            centerInsufficientSlides: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        })
        let main = new Swiper(containerMain, {
            wrapperClass: 'main-carousel__list',
            slideClass: 'main-carousel__item',
            slidesPerView: 'auto',
            direction: 'vertical',
            watchOverflow: true,
            effect: 'fade',
            speed: 800,
            roundLengths: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            // mousewheel: true,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     waitForTransition: false
            // },
            thumbs: {
                swiper: thumbs,
            },
            // navigation: {
            //     prevEl: navPrev,
            //     nextEl: navNext,
            //     lockClass: '_lock',
            //     disabledClass: '_disabled'
            // },
            pagination: {
                el: pagination,
                lockClass: '_lock',
                clickable: true
            }
        })
    })

    /*-------------------------------------------------------------------------------------*/

    const popularBlock = Array.from(document.querySelectorAll('.popular-block'))

    popularBlock.forEach(item => {
        let container = item.querySelector('.popular-block__wrap')

        let main = new Swiper(container, {
            wrapperClass: 'popular-block__list',
            slideClass: 'popular-block__item',
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 1000,
            loop: true,
            roundLengths: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false
            },
        })
    })

    /*-------------------------------------------------------------------------------------*/

    const benefitsCard = Array.from(document.querySelectorAll('.benefits-card'))

    benefitsCard.forEach(item => {
        let container = item.querySelector('.benefits-card__wrap')

        let main = new Swiper(container, {
            wrapperClass: 'benefits-card__list',
            slideClass: 'benefits-card__item',
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 1000,
            roundLengths: true,
        })
    })

    /*-------------------------------------------------------------------------------------*/

    const sampleCarousel = Array.from(document.querySelectorAll('.sample-carousel'))

    sampleCarousel.forEach(item => {
        let container = item.querySelector('.sample-carousel__wrap')
        let pagination = item.querySelector('.sample-carousel__pagination')

        let main = new Swiper(container, {
            wrapperClass: 'sample-carousel__list',
            slideClass: 'sample-carousel__item',
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 1000,
            roundLengths: true,
            direction: 'vertical',
            pagination: {
                el: pagination,
                lockClass: '_lock',
                clickable: true
            }
        })
    })

    /*-------------------------------------------------------------------------------------*/

})

document.addEventListener('click', function (e) {
  let target = e.target
  let trigger = target.closest('.select-dropdown__trigger, [data-dropdown-trigger]')
  if (!trigger) return
  e.preventDefault()

  let wrap = trigger.closest('.select-dropdown')
  let block = wrap.querySelector('.select-dropdown__dropdown')
  let corner = wrap.querySelector('.select-dropdown__dropdown-corner')
  let offset = 10

  if (!wrap.classList.contains('_active')) {
    document.addEventListener('click', onClickOut)
    wrap.addEventListener('click', onClose)
    open()
  }

  function open() {
    block.style.display = 'flex'
    corner.style = null
    let list = wrap.querySelector('.select-dropdown__dropdown-list')
    if (list) {
      list.style.width = `${list.scrollWidth}px`
    }

    setTimeout(() => {
      let blockRect = block.getBoundingClientRect()
      let offsetRight = Math.round((window.innerWidth - blockRect.right))
      let offsetLeft = Math.round((blockRect.left))

      if (offsetRight <= offset) {
        offsetRight = offsetRight - offset
        block.style.marginLeft = `${offsetRight}px`
        corner.style.marginLeft = `${offsetRight * -1}px`
      } else if (offsetLeft <= offset) {
        offsetLeft = offsetLeft - offset
        block.style.marginLeft = `${offsetLeft * -1}px`
        corner.style.marginLeft = `${offsetLeft}px`
      }

      wrap.classList.add('_active')
    })
  }

  function onClose(e) {
    let btn = e.target.closest('a, .select-dropdown__dropdown-close')
    if (btn) {
      close()
      wrap.removeEventListener('click', onClose)
    }
  }

  function close() {
    block.addEventListener('transitionend', onTransitionEnd, false)

    setTimeout(() => {
      wrap.classList.remove('_active')
      document.removeEventListener('click', onClickOut)
      wrap.removeEventListener('click', onClose)
    })

    function onTransitionEnd() {
      block.style = null
      block.removeEventListener('transitionend', onTransitionEnd, false)
    }
  }

  function onClickOut(e) {
    if (!wrap.classList.contains('_active')) return
    const isElement = e.target === block || block.contains(e.target)
    if (!isElement) {
      close()
    }
  }
})

document.querySelectorAll('.text-animation').forEach(el => {
    animateText(el)
})

function animateText(el) {
    const tl = gsap.timeline()
    let text = el.textContent
    text = text.split('')
    el.classList.add('animate')

    el.innerHTML = ''

    text.forEach(letter => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter

        if (letter.trim()) {
            letterEl.classList.add('letter')
        }

        el.appendChild(letterEl)

        tl.to(letterEl, {
            opacity: 1,
            translateX: 0,
            duration: 0.3,
        }, '-=0.25')
    })
}

let thumbItem = document.querySelectorAll('.main-carousel__thumb-item')

thumbItem.forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.text-animation').forEach(el => {
            animateText(el)
        })
    })
})

let eventCloseModal = new Event('onCloseModal', {bubbles: true})

function openModal(name) {
  if(!name) return
  let modal = document.querySelector(`[data-modal="${name}"]`)
  if(!modal) return
  let isMobOnly = modal.hasAttribute('data-modal-mob-only')
  let modalContent = modal.querySelector('[data-modal-content]')
  let resizeTimer = null

  if (!modal.classList.contains('_active')) {
    document.addEventListener('click', onClickOut)
    document.addEventListener('keyup', onKeyUp)
    setTimeout(onOpen)
  }

  function onKeyUp(e) {
    if (e.keyCode === 27) {
      e.preventDefault()
      onCloseModal()
    }
  }

  function onResizeClose() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if(window.innerWidth >= 1000) {
        onCloseModal()
      }
    }, 200)
  }

  function onOpen() {
    closeModal()
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add('_active')
      document.body.classList.add('_scroll-lock')
      document.body.classList.add('_modal-open')
      document.addEventListener('onCloseModal', onCloseModal)
      if(isMobOnly) {
        window.addEventListener('resize', onResizeClose)
      }

    }, 100)
  }

  function onClickOut(e) {
    if (e.target.closest('[class*=" mx-"]') || !modal.classList.contains('_active')) return
    const isElement = e.target === modalContent || modalContent.contains(e.target)
    if (!isElement) {
      closeModal()
    }
  }

  function onCloseModal() {
    modal.classList.remove('_active')
    document.body.classList.remove('_scroll-lock')
    document.body.classList.remove('_modal-open')
    document.removeEventListener('click', onClickOut)
    document.removeEventListener('onCloseModal', onCloseModal)
    document.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('resize', onResizeClose)
    modal.addEventListener('transitionend', onTransitionEnd, false)

    function onTransitionEnd() {
      modal.style = null;
      modal.removeEventListener('transitionend', onTransitionEnd, false)
    }
  }
}

function closeModal() {
  document.dispatchEvent(eventCloseModal)
}

document.addEventListener('click', function (e) {

  let triggerOpen = e.target.closest('[data-modal-open]')
  let triggerClose = e.target.closest('[data-modal-close]')


  if(triggerOpen) {
    e.preventDefault()
    let name = triggerOpen.getAttribute('data-modal-open')
    openModal(name)
  } else if(triggerClose) {
    e.preventDefault()
    closeModal()
  }
});
