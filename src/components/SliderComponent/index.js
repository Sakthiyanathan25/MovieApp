import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'
import './index.css'

const SimpleSlider = props => {
  const {List} = props
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="item-container">
      <Slider {...settings} className="slide-container">
        {List.map(eachVideo => (
          <Link to={`/movies/${eachVideo.id}`} key={eachVideo.id}>
            <div className="SlideItems">
              <img
                className="images"
                src={eachVideo.posterPath}
                alt={eachVideo.title}
              />
              <h1 className="title">{eachVideo.title}</h1>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
export default SimpleSlider
