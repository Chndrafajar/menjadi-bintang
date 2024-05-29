import React from 'react';

const Stories = () => {
  return (
    <>
      <section className="stories" id="story">
        <div className="container">
          <div className="row">
            <h4>Stories</h4>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img src="/images/img-story.png" alt="" />
            </div>
            <div className="col-md-7">
              <h2>Overview Menjadi Bintang</h2>
              <p>
                is a site created to make it easier for people to find jobs according to their skills, with a mission to make it easier for companies to find workers with genius talents in their fields is a site created to make it easier
                for people to find jobs according to their skills, with a mission to make it easier for companies to find workers with genius talents in their fields
              </p>
              <div className="info">
                <div className="card-info">
                  <h4>1000+</h4>
                  <span>Jobs</span>
                </div>
                <div className="card-info">
                  <h4>800+</h4>
                  <span>Company</span>
                </div>
                <div className="card-info">
                  <h4>2000+</h4>
                  <span>User</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stories;
