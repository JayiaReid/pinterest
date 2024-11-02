import { useEffect } from 'react';
import $ from 'jquery';

export default function Slideshow() {
  useEffect(() => {
    const $window = $(window);
    const $body = $('body');

    class Slideshow {
      constructor(userOptions = {}) {
        const defaultOptions = {
          $el: $('.slideshow'),
          showArrows: false,
          showPagination: true,
          duration: 10000,
          autoplay: true
        };

        let options = { ...defaultOptions, ...userOptions };
        this.$el = options.$el;
        this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
        this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
        this.showPagination = options.showPagination;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animationDuration = 1200;
        this.autoplaySpeed = options.duration;
        this.$controls = this.$el.find('.js-slider-home-button');
        this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

        this.$el.on('click', '.js-slider-home-next', () => this.nextSlide());
        this.$el.on('click', '.js-slider-home-prev', () => this.prevSlide());
        this.$el.on('click', '.js-pagination-item', event => {
          if (!this.isAnimating) {
            this.preventClick();
            this.goToSlide(event.target.dataset.slide);
          }
        });

        this.init();
      }

      init() {
        this.goToSlide(1);
        if (this.autoplay) this.startAutoplay();
        if (this.showPagination) {
          let pagination = '<div class="pagination"><div class="container">';
          for (let i = 0; i < this.maxSlide; i++) {
            let item = `<span class="pagination__item js-pagination-item ${
              i === 0 ? 'is-current' : ''
            }" data-slide=${i + 1}>${i + 1}</span>`;
            pagination = pagination + item;
          }
          pagination = pagination + '</div></div>';
          this.$el.append(pagination);
        }
      }

      preventClick() {
        this.isAnimating = true;
        this.$controls.prop('disabled', true);
        clearInterval(this.interval);
        setTimeout(() => {
          this.isAnimating = false;
          this.$controls.prop('disabled', false);
          if (this.autoplay) this.startAutoplay();
        }, this.animationDuration);
      }

      goToSlide(index) {
        this.currentSlide = parseInt(index);
        if (this.currentSlide > this.maxSlide) this.currentSlide = 1;
        if (this.currentSlide === 0) this.currentSlide = this.maxSlide;

        const newCurrent = this.$el.find(
          `.js-slider-home-slide[data-slide="${this.currentSlide}"]`
        );
        const newPrev =
          this.currentSlide === 1
            ? this.$el.find('.js-slider-home-slide').last()
            : newCurrent.prev('.js-slider-home-slide');
        const newNext =
          this.currentSlide === this.maxSlide
            ? this.$el.find('.js-slider-home-slide').first()
            : newCurrent.next('.js-slider-home-slide');

        this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
        this.$el.find('.js-pagination-item').removeClass('is-current');

        if (this.maxSlide > 1) {
          newPrev.addClass('is-prev');
          newNext.addClass('is-next');
        }

        newCurrent.addClass('is-current');
        this.$el.find(`.js-pagination-item[data-slide="${this.currentSlide}"]`).addClass('is-current');
      }

      nextSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide + 1);
      }

      prevSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide - 1);
      }

      startAutoplay() {
        this.interval = setInterval(() => {
          if (!this.isAnimating) this.nextSlide();
        }, this.autoplaySpeed);
      }
    }

    function load() {
      const options = { showPagination: true };
      new Slideshow(options);
    }

    function addLoadClass() {
      $body.addClass('is-loaded');
      setTimeout(() => $body.addClass('is-animated'), 600);
    }

    let loaded = false;
    $window.on('load', () => {
      if (!loaded) {
        loaded = true;
        load();
      }
    });

    setTimeout(() => {
      if (!loaded) {
        loaded = true;
        load();
      }
    }, 3000);

    addLoadClass();
  }, []);

  return (
    <div id="wrapper">
      <section className="slideshow" id="js-header">
        {[...Array(3).keys()].map(i => (
          <div
            key={i}
            className={`slideshow__slide js-slider-home-slide ${i === 0 ? 'is-current' : i === 1 ? 'is-next' : 'is-prev'}`}
            data-slide={i + 1}
          >
            <div className="slideshow__slide-background-parallax background-absolute js-parallax" data-speed="-1" data-position="top" data-target="#js-header">
              <div className="slideshow__slide-background-load-wrap background-absolute">
                <div className="slideshow__slide-background-load background-absolute">
                  <div className="slideshow__slide-background-wrap background-absolute">
                    <div className="slideshow__slide-background background-absolute">
                      <div className="slideshow__slide-image-wrap background-absolute">
                        <div
                          className="slideshow__slide-image background-absolute"
                          style={{
                            backgroundImage: `url(https://images.pexels.com/photos/${i === 0 ? '190537' : i === 1 ? '110649' : '196666'}/pexels-photo-${i === 0 ? '190537' : i === 1 ? '110649' : '196666'}.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920)`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slideshow__slide-caption">
              <div className="slideshow__slide-caption-text">
                <div className="container js-parallax" data-speed="2" data-position="top" data-target="#js-header">
                  <h1 className="slideshow__slide-caption-title">{['Everything broken can be repaired', 'See through the field', 'Hey, take a time to relax!'][i]}</h1>
                  <a className="slideshow__slide-caption-subtitle -load o-hsub -link" href="#">
                    <span className="slideshow__slide-caption-subtitle-label">{['See how', 'Learn more about', 'Everybody needs'][i]}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="c-header-home_footer">
          <div className="o-container">
            <div className="c-header-home_controls -nomobile o-button-group">
              <div className="js-parallax is-inview" data-speed="1" data-position="top" data-target="#js-header">
                <button className="o-button -white -square -left js-slider-home-button js-slider-home-prev" type="button">
                  <span className="o-button_label">
                    <svg className="o-button_icon" role="img">
                      <use xlinkHref="#arrow-prev"></use>
                    </svg>
                  </span>
                </button>
                <button className="o-button -white -square js-slider-home-button js-slider-home-next" type="button">
                  <span className="o-button_label">
                    <svg className="o-button_icon" role="img">
                      <use xlinkHref="#arrow-next"></use>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
