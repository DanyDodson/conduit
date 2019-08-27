import React from 'react'
// import { Video, Transformation } from 'cloudinary-react'

const Introduction = () => (
  <div>
    <h1 className="welcome">Welcome!</h1>
    <div className="introducing-cloudinary">
      <p>
        This is the main demo page of the PhotoAlbum sample React
        application of Cloudinary.<br /> Here you can see all images you
        have uploaded to this application and find some information on
        how to implement your own React application storing,
        manipulating and serving your photos using Cloudinary!
      </p>
      {/* <p>
        <Video
          publicId="manipulation_video"
          cloudName="cloudinary"
          controls={true}
          preload="none"
          width="925"
          crop="scale"
          className="manipulation-video"
          fallbackContent="Your browser does not support HTML5 video tags"
          poster={{
            gravity: 'north',
            startOffset: '28',
            transformation: [{ effect: 'sepia', fetchFormat: 'auto' }],
          }}
          sourceTransformation={{
            webm: { quality: '70' },
            mp4: { overlay: 'text:verdana_30:Greetings!' },
          }}>
          <Transformation
            overlay="text:arial_20:Cloudinary%20features"
            color="red"
            gravity="north"
            y="12"
          />
        </Video>
      </p> */}
    </div>
    <hr />
  </div>
)

export default Introduction
