import React from 'react';
import { Media, Card, CardHeader, CardBody } from 'reactstrap';


function About() {
  return (
    <div className="container2">
      <h2>About</h2>
      <div className="row">
        <div className="col-7">
          <Card>
            <CardHeader>
              <Media heading>Taiwan is not Thailand!</Media>
            </CardHeader>
          </Card>
        </div>
        <div className="col-4">
          <Card>
            <CardBody>
              <iframe width="560" height="315"
                src="https://www.youtube.com/embed/1Ril3FsWTi0"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </CardBody>
          </Card>
        </div>

      </div>

      <div className="row">
        <div className="col-7">
          <Card>
            <CardHeader> 
              <Media heading>
                With legacies as varied as its adventure landscape and
                spirited traditions thriving alongside the cream of Asian sophistication, Taiwan is a continent on one green island.
              </Media>
            </CardHeader>
          </Card>
        </div>
        <div className="col-4">
          <Card>
            <CardBody>
              <iframe width="560" height="315"
                src="https://www.youtube.com/embed/dp8xuBqTAUs"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
              </iframe>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;