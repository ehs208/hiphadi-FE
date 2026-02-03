import { useQuery } from '@tanstack/react-query';
import { getPublicHeaderImagesAPI, LibraryImage } from '@api/admin/imageAPI';
import Slider from 'react-slick';
import picture1 from '@images/hiphadi1.jpeg';
import picture2 from '@images/hiphadi2.jpeg';
import { getImageUrl } from '@lib/axiosConfig';

// Fallback images used when no header images are configured via admin
const fallbackImages = [
  { src: picture1, alt: '힙하디 사진1' },
  { src: picture2, alt: '힙하디 사진2' },
];

export default function ImageHeader() {
  const { data: headerImages } = useQuery<LibraryImage[]>({
    queryKey: ['publicHeaderImages'],
    queryFn: getPublicHeaderImagesAPI,
    staleTime: 5 * 60 * 1000,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Use API images if available, otherwise fall back to static images
  const hasApiImages = headerImages && headerImages.length > 0;

  return (
    <div className="mb-2 relative">
      <Slider {...settings}>
        {hasApiImages
          ? headerImages.map((img, index) => (
              <div key={img.id} className="w-screen relative">
                <img
                  src={getImageUrl(img.url)}
                  alt={`힙하디 사진${index + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))
          : fallbackImages.map((img, index) => (
              <div key={index} className="w-screen relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover"
                />
              </div>
            ))}
      </Slider>
      {/* Gradient overlay for smooth transition into content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-lounge-gradient pointer-events-none" />
    </div>
  );
}
