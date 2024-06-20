import React from "react";

function About() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="relative isolate px-6 pt-14 lg:px-8"></div>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="content-center items-center flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-2/4 ">
            <img
              className="w-80 h-80 rounded-xl"
              src="me.jpg"
              alt="A group of People"
            />
            <p className="text-2xl text-start lg:text-xl font-bold leading-9 text-gray-800 pb-4">
              Sudhakar, Founder and CEO
            </p>
          </div>
          <div className="w-full lg:w-6/6 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Welcome to Jevars Financial Office
            </h1>
            <p className="indent-10 font-normal text-base leading-6 text-gray-600 ">
              Jevars Financial Office is founded and led by Sudhakar, a dynamic
              entrepreneur with a diploma in mechanical engineering and a
              passion htmlFor finance. With his expertise and vision, Jevars is
              committed to providing top-notch financial services to individuals
              and businesses.
            </p>
            <p className="indent-10 font-normal text-base leading-6 text-gray-600 ">
              At Jevars, we understand that each client has unique financial
              goals and challenges. That's why we offer personalized solutions
              tailored to your specific needs. Whether you're planning htmlFor
              retirement, investing htmlFor the future, or managing your taxes, our
              team of experts is here to help you navigate the complexities of
              the financial world.
            </p>
            <p className="indent-10 font-normal text-base leading-6 text-gray-600 ">
              Our mission is to empower our clients to achieve financial success
              and security. We believe in building long-term relationships based
              on trust, integrity, and professionalism. With Jevars Financial
              Office, you can count on reliable advice and exceptional service
              every step of the way.
            </p>
            <p className="indent-10 font-normal text-base leading-6 text-gray-600 ">
              Thank you htmlFor considering Jevars Financial Office htmlFor your
              financial needs. We look htmlForward to serving you and helping you
              build a brighter financial future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
