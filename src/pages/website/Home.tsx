import React from "react";
import hero_banner_image from "../../assets/images/hero-banner.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FAQAccordion from "../../components/FAQs";
import MainSpinnerLoader from "../../components/MainSpinnerLoader";
import useWebsiteCategories from "../../hooks/useWebsiteCategories";
import { handleError } from "../../toast";
import no_image from "../../assets/images/no_image.png";
import { NavLink } from "react-router-dom";

const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 650 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 1,
  },
};
interface HomeProps{
  data: {
    promotional_items: []
  },
  isLoading: boolean
}
const Home: React.FC<HomeProps> = ({data, isLoading}) => {
  const {data: website_categories, isLoading: loadingData, error} = useWebsiteCategories({search: "", page: 1, limit: 1000});
  console.log("Website categories data:", website_categories);
  if(error){
    handleError('Something went wrong!')
  }
  return (
    <>
    <section id="hero-section" className="bg-[#fff5ed]">
  <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center min-h-[80vh] px-6 py-10 max-w-[1400px]">
    {/* Left content */}
    <div className="text-center md:text-left md:w-1/2 mt-8 md:mt-0">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Unlock Exclusive <br className="hidden sm:block" /> Rewards as{" "}
        <span className="primary-color-text">You Win</span>
      </h1>
      <p className="text-[#8b8b8b] my-5 text-base sm:text-lg">
        Lorem, ipsum dolor sit amet consectetur adipisicing <br className="hidden sm:block" />
        elit. Molestiae, quasi minima magnam voluptatum totam unde?
      </p>
      <button className="primary-button mt-3">Start Solving</button>
    </div>

    {/* Right image */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src={hero_banner_image}
        alt="Hero Banner"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain"
      />
    </div>
  </div>
</section>

{ isLoading ? <div className="w-[100%] flex justify-center items-center py-6"><MainSpinnerLoader/></div> : (data?.promotional_items.length > 0 && (<div className="slide-text-section px-2">
        <div className="text_scroller_1 scroller_item_1 ul-li">
          
            {data?.promotional_items.map((item: any)=> (
              <>
              <ul>
 <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
          </ul>
          <ul aria-hidden="true">
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
            <li>
              <h3>{item?.title}</h3>
            </li>
             </ul>
              </>
            ))}
           
         
        </div>
      </div>))
  
}

{loadingData ? <div className="w-[100%] flex justify-center items-center py-6"><MainSpinnerLoader/></div> : <section id="categories" className="py-15 max-w-[1400px] container mx-auto px-4">
        <h2 className="font-semibold text-center mb-5 text-3xl lg:text-4xl">Choose Category</h2>
        <Carousel
          responsive={responsive2}
          className="slide-carousol-service-box-set pb-5"
        >
 {website_categories.data?.map((category: {_id: string, slug: string, image: string, category_name: string}) => (
    <NavLink to={'/categories/' + category?.slug} className={'block'}>
    <div
      key={category?._id}
      className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-[#fff5ed]"
    >
      <div className="flex justify-center items-center box-image">
        <img src={category?.image == null || category?.image == undefined || category?.image == "" ? no_image : import.meta.env.BASE_URL + "/uploads/" + category?.image} alt="" />
      </div>
      <h3 className="text-lg font-semibold mt-3">{category?.category_name}</h3>
    </div>
    </NavLink>
  ))}

        </Carousel>
       <div className="text-center"> <NavLink to={'/categories'} className="primary-button">View All</NavLink></div>
      </section>}
      

          <FAQAccordion/>
      
    </>
  );
};

export default Home;
