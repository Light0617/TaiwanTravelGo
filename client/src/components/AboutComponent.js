import React from 'react';
import { Media, Card, CardHeader, CardBody } from 'reactstrap';

function AboutContent({heading, srcIp}) {
  return (
    <div className="row">
      <div className="col-7">
        <Card>
          <CardHeader>
            <Media heading>{heading}</Media>
          </CardHeader>
        </Card>
      </div>
      <div className="col-4">
        <Card>
          <CardBody>
            <iframe width="560" height="315"
              src={srcIp} title={heading}
              frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function About() {
  const heading1 = "Taiwan is not Thailand!";
  const heading2 = "With legacies as varied as its adventure landscape and spirited traditions thriving alongside the cream of Asian sophistication, Taiwan is a continent on one green island.";

  const srcIp1 = "https://www.youtube.com/embed/1Ril3FsWTi0";
  const srcIp2 = "https://www.youtube.com/embed/dp8xuBqTAUs";

  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>About</h1>
          <hr />
        </div>
      </div>
      <AboutContent heading={heading1} srcIp={srcIp1}/>
      <AboutContent heading={heading2} srcIp={srcIp2}/>
    </div>
  );
}

export default About;