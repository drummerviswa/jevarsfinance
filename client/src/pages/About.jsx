import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About";
  }, []);
  const owners = [
    {
      para: `Jevars Financial Office is founded and led by Mr.Ravikumar , a dynamic entrepreneur with a diploma in mechanical engineering and a passion for finance. With his expertise and vision, Jevars is committed to providing top-notch financial services to individuals and businesses.
 At Jeevars, we understand that each client has unique financial goals and challenges. That's why we offer personalized solutions tailored to your specific needs. Whether you're planning for retirement, investing for the future, or managing your taxes, our team of experts is here to help you navigate the complexities of the financial world.
 Our mission is to empower our clients to achieve financial success and security. We believe in building long-term relationships based on trust, integrity, and professionalism. 
With Jeevars Financial Office, you can count on reliable advice and exceptional service every step of the way.
 Thank you for considering Jeevars Financial Office for your financial needs. We look forward to serving you and helping you build a brighter financial future`,
      title: "Ravikumar (Founder and MD)",
      img: "dad.jpg",
    },
    {
      para: "Mrs.Vanitha , the Managing Partner of our financial company, bringing over two decades of experience and expertise to our team. With a keen eye for detail and a passion for excellence, she has played a pivotal role in shaping our company’s vision and strategy. Her leadership has been instrumental in driving growth, fostering innovation, and maintaining the highest standards of client service. Under her guidance, we have achieved numerous milestones and continue to strive towards new heights. Vanitha’s dedication and commitment to the financial industry make her an invaluable asset to our firm and our clients.",
      title: "Vanitha ( Managing Partner )",
      img: "mom.jpg",
    },
    {
      para: `Welcome to Jevars Financial Service. It has been my privilege to lead this company and serve our clients with dedication and integrity. As I step down, I am proud to introduce my son, Sudhakar, as the next Managing Director. Sudhakar has shown exceptional commitment and vision, and I am confident that he will continue our tradition of excellence, offering personalized financial advice and comprehensive solutions to help you achieve your financial goals. Thank you for your continued trust in our services.
Warm regards,
Ravikumar K`,
      title: "Sudhakar R.V",
      img: "me.jpg",
    },
  ];
  return (
    <div className="flex-row min-h-screen justify-center items-center">
      <div className="relative isolate px-6 pt-14 lg:px-8"></div>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <h1 className="pt-10 text-center text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
          Welcome to Jevars Financial Office
        </h1>
        {owners.map((item) => (
          <div className="py-7 content-center items-center flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-2/4 items-center flex flex-col justify-center">
              <img
                className="w-80 h-80 rounded-xl"
                src={item.img}
                alt="A group of People"
              />
              <p className="text-2xl text-center lg:text-xl font-bold leading-9 text-gray-800 pb-4">
                {item.title}
              </p>
            </div>
            <div className="w-full lg:w-6/6 flex flex-col justify-center">
              <p className="indent-10 font-normal text-base leading-6 text-gray-600 ">
                {item.para}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
