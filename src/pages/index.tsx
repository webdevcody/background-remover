import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { BsShareFill, BsFillGearFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdHighQuality } from "react-icons/md";
import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";

export function Time() {
  const features = [
    {
      name: "Effortless Operation",
      description:
        "With a user-friendly interface, our service ensures a smooth experience from uploading images to receiving the final output, making it accessible for everyone, regardless of their technical skills.",
      icon: ArrowPathIcon,
    },
    {
      name: "Quick Turnaround",
      description:
        "Leveraging advanced AI technology, our software completes background removal tasks rapidly, helping you meet tight deadlines with ease.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "High Precision",
      description:
        "Our service offers accurate results, meticulously isolating the subject of your image while removing the background, minimizing the need for manual touch-ups.",
      icon: BsFillGearFill,
    },
    {
      name: "Bulk Processing",
      description:
        "Our software is designed to handle multiple images at once, saving you considerable time when working on large-scale projects.",
      icon: RiMoneyDollarCircleFill,
    },
    {
      name: "Affordable",
      description:
        "By automating the background removal process, our SaaS product eliminates the need for hiring professionals, thus saving you money.",
      icon: MdHighQuality,
    },
    {
      name: "Compatibility",
      description:
        "The processed images are provided in various common formats, ensuring they can be readily used across different platforms, be it for web design, e-commerce listings, or social media posts.",
      icon: BsShareFill,
    },
  ];

  return (
    <section className="mx-auto mb-24 max-w-7xl px-8 sm:max-w-screen-sm md:max-w-none">
      <div className="mx-auto max-w-2xl md:text-center">
        <p className="mt-2 text-4xl font-bold">
          Experience the Power of Automation with Our Solution
        </p>
        <p className="mt-6">
          Manual background removal from images can be a tedious, time-consuming
          task requiring meticulous attention to detail and specialized skills.
          However, our product provides a seamless, hassle-free alternative that
          significantly reduces your workload.
        </p>
        <p className="mt-6">
          By leveraging advanced AI technologies, our service automates the
          process of background removal, delivering high-quality results in
          record time. No longer will you have to painstakingly edit each image
          - instead, simply upload your photos and let our software do the work
          for you. Our service ensures precision, speed, and efficiency, saving
          you valuable time that can be better spent on your core business
          activities.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="font-semibold">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-blue">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 dark:text-gray-300">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Testimonials() {
  function Testimonial({
    image,
    name,
    handle,
    testimonial,
  }: {
    image: string;
    name: string;
    handle: string;
    testimonial: string;
  }) {
    function FiveStar() {
      return (
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      );
    }

    return (
      <div className="rounded-4xl h-full border bg-gray-600 bg-opacity-60 p-6">
        <div className="flex h-full flex-col justify-between">
          <div className="mb-5 block">
            <header className="-m-2 mb-4 flex flex-wrap">
              <div className="w-auto p-2">
                <img
                  width="50"
                  height="50"
                  src={image}
                  alt="image of man in red"
                />
              </div>
              <div className="w-auto p-2">
                <h3 className="font-semibold leading-normal">{name}</h3>
                <p className="uppercase text-gray-300">{handle}</p>
              </div>
            </header>
            <FiveStar />
            <p className="mt-6 text-lg font-medium">{testimonial}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="mx-auto mb-24 max-w-7xl px-8 xl:max-w-screen-lg">
      <div className="container relative z-10 mx-auto">
        <h2 className="mb-16 text-left text-4xl md:text-center">
          What our users are saying
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            image="/static/person1.png"
            name="Sarah (Small Business Owner)"
            testimonial="As someone who constantly juggles many roles in my business, this product is a game-changer. The ease of use is just phenomenal - I can remove backgrounds from product photos in seconds without any previous design experience. It's my secret weapon for e-commerce success!"
            handle="@BizWizSarah"
          />
          <Testimonial
            image="/static/person2.png"
            name="James (Freelance Photographer)"
            testimonial="I was skeptical at first, but this tool has quickly become indispensable. It's impressively easy to use and saves me so much time on post-production. Now I can focus more on my passion - capturing beautiful shots."
            handle="@LensMasterJames"
          />
          <Testimonial
            image="/static/person3.png"
            name="Alicia (Digital Marketer)"
            testimonial="This is the dream tool for any marketer! The simplicity of the software allowed me to incorporate it into our workflow effortlessly. My team now creates engaging visual content faster than ever before."
            handle="@DigitalMavenAlicia"
          />
          <Testimonial
            image="/static/person4.png"
            name="Mark (Graphic Designer)"
            testimonial="The background removal process was always a time-consuming part of my work, but this tool has completely transformed that. It's simple, quick, and the results are spot-on. It's like having an extra pair of hands!"
            handle="@DesignGuruMark"
          />
          <Testimonial
            image="/static/person5.png"
            name="Ella (Blogger)"
            testimonial="Creating visually compelling content is key for my blog. This software lets me remove backgrounds effortlessly, enabling me to create stunning visuals without wasting time on manual editing. I couldn't recommend it more!"
            handle="@BlogQueenElla"
          />
          <Testimonial
            image="/static/person6.png"
            name="Brian (Web Developer)"
            testimonial="This tool is the epitome of user-friendly design. It has drastically reduced the time I spend on image editing, leaving me with more time to focus on building and optimizing websites. It's an essential part of my toolkit now."
            handle="@WebDevWhizBrian"
          />
        </div>
      </div>
    </section>
  );
}

function ItsEasy() {
  return (
    <section className="container relative mx-auto mb-12 max-w-screen-sm px-8 py-16 text-left md:text-center">
      <p className="mb-8 mt-2 text-4xl font-bold">
        Like seriously, it&apos;s THIS easy
      </p>

      <video width="800" height="600" controls>
        <source src="/static/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

function InfoCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <img
        width="200"
        height="200"
        src={image}
        className="mx-auto rounded-lg bg-gray-200 p-4"
        alt="a piggy bank image of someone saving money"
      />
      <div className="w-full text-center text-2xl font-bold">{title}</div>
      <p className="mb-8 ">{description}</p>
    </div>
  );
}

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Background Remover</title>
        <meta
          name="description"
          content="remove background from images with backgroundcutter.com"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <div className="relative min-h-screen overflow-clip  text-lg leading-8">
        <div>
          <section className="container relative mx-auto grid grid-cols-1 gap-12 px-8 pb-12 pt-24 md:grid-cols-2 xl:max-w-screen-lg">
            <div className="mb-12 md:mb-0">
              <h1 className="text-5xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
                Remove backgrounds in seconds
              </h1>
              <p className="mb-8 mt-6 text-lg leading-8">
                Stop using the lasso tool to extract main parts of images. Our
                service will automatically find the foreground image and
                generate a transparent cutout for you.
              </p>
              <div className="relative flex justify-center md:justify-start">
                <Link href="/remove" className="btn-primary btn">
                  Get started
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                className="h-[500px]"
                src="/static/banner.jpg"
                alt="banner"
              />
            </div>
          </section>

          {/* <section className="container mx-auto mb-4 max-w-screen-lg pt-12 text-center text-4xl">
            Join the{" "}
            <span className="text-blue-400">{info.data?.users} users </span>
            creating{" "}
            <span className="text-yellow-400">{info.data?.icons} icons</span> so
            far!
          </section> */}

          <ItsEasy />
          <Time />
          <Testimonials />

          <section className="container mx-auto mb-24 max-w-screen-lg px-8">
            <h2 className="mb-12 text-left text-4xl md:text-center">
              The Benefits of Online Background Removers
            </h2>

            <p className="mx-auto mb-12 max-w-screen-sm ">
              Let{"'"}s face it, your valuable time and resources shouldn{"'"}t
              be spent on locating a designer, navigating through endless email
              threads, and repeatedly tweaking your image. By utilizing our
              AI-driven background removal tool, you can enjoy a multitude of
              benefits, saving both your time and money while delivering
              professional-quality results.
            </p>

            <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
              <InfoCard
                image="/static/savings.svg"
                title="Simplicity at Your Fingertips"
                description="Our SaaS product is designed with usability in mind. Irrespective of your technical skill level, you can easily navigate our user-friendly interface to remove backgrounds from your images. This tool is a dream for those who are not design-savvy but require professional-looking images for their websites, e-commerce platforms, or social media pages. It's as easy as uploading your images, and with a single click, your background is gone."
              />

              <InfoCard
                image="/static/speed.svg"
                title="Save Time with Rapid Processing"
                description="Speed is the essence in today's digital world. Our background removal tool harnesses the power of AI to deliver results in record time. Whether you need to process a single image or a bulk of pictures, our service ensures a quick turnaround without compromising the quality of the output. By taking care of the tedious task of background removal, we free up your time for more critical aspects of your business."
              />

              <InfoCard
                image="/static/consistency.svg"
                title="Precision that Speaks Volumes"
                description="Our service prioritizes accuracy in its output. The advanced AI algorithms that drive our software are programmed to meticulously isolate the subjects in your images and remove backgrounds with utmost precision. This level of detail gives your visuals a professional touch, making them ready to use without any additional edits or tweaks."
              />

              <InfoCard
                image="/static/preferences.svg"
                title="Cost-Efficiency for Your Business"
                description="Automating the process of background removal with our SaaS product results in significant cost savings. The need for hiring professional designers or spending on expensive design software is effectively eliminated. You get high-quality, professional-standard images without the hefty price tag. It's an affordable solution that aligns perfectly with your budget while meeting your image editing needs."
              />
            </div>

            <p className="mx-auto mb-8 max-w-screen-sm px-12">
              Our background removal service is an exceptional solution for web
              application developers aiming to produce professional-grade images
              swiftly, economically, and with consistent quality. While the need
              for a designer may still exist for complex tasks, our AI-powered
              background remover can be an invaluable addition to your design
              arsenal, offering customizability and ease in image manipulation.
              It stands as an excellent tool to streamline and optimize your
              design process.
            </p>
          </section>

          <section className="mb-24 text-center">
            <Link href="/remove" className="btn-primary btn">
              Get started!
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
