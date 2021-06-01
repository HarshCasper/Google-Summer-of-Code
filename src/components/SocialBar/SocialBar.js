import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Github, Twitter } from '../icons';

function SocialBar() {
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={socialQuery}
      render={(data) => {
        const { twitter, github } = data.site.siteMetadata.social;
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: 'auto',
            }}
          >
            {twitter && <Twitter username={twitter} />}
            {github && <Github username={github} />}
          </div>
        );
      }}
    />
  );
}

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`;
export default SocialBar;
