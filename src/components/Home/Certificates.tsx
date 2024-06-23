import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { certificates } from '@/data/skills';

import Container from '@/components/UI/Container';

import 'react-vertical-timeline-component/style.min.css';

const CertificateCard = ({...props}) => {
  let {
    certificate,
    ...rest
  } = props;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={certificate.date}
      iconStyle={{ background: certificate.image }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={certificate.image}
            alt=""
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{certificate.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {certificate.organization}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

function Certificates() {
  return (
    <Container>
      <section id="certificates" className="relative">
        <VerticalTimeline>
          {certificates.map((certificate, index) => (
            <CertificateCard 
            key={`cert-${index}`}
            certificate={certificate}
            />
          ))}
        </VerticalTimeline>
      </section>
    </Container>
  );
}


export default Certificates;
