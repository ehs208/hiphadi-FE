import Slider from 'react-slick';
import picture1 from '@images/hiphadi1.jpeg';
import picture2 from '@images/hiphadi2.jpeg';
import hiphadiEvent from '@images/hiphadi_event.png';

export default function ImageHeader() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="mb-5">
      
      {/* <Slider {...settings}> */}
      <div className="w-screen">
          <img
            src={hiphadiEvent}
            alt="힙하디 이벤트"
            className="w-full object-cover"
          />
        </div>
        {/* <div className="w-screen">
          <img
            src={picture1}
            alt="힙하디 사진1"
            className="w-full object-cover"
          />
        </div> */}
        {/* <div className="w-screen">
          <img
            src={picture2}
            alt="힙하디 사진2"
            className="w-full object-cover"
          />
        </div> */}
      {/* </Slider> */}
    </div>
  );
}
