import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import readingComicFirst from "../../assets/images/reading_comic_1.jpg";
import readingComicSecond from "../../assets/images/reading_comic_2.webp";
import heroFirst from "../../assets/images/hero_1.jpg";
import heroSecond from "../../assets/images/hero_2.webp";
import stanLeeFirst from "../../assets/images/stan_lee_1.jpg";
import stanLeeSecond from "../../assets/images/stan_lee_2.webp";
import stanLeeThird from "../../assets/images/stan_lee_3.jpg";
import comic from "../../assets/images/comics.jpg";
import character from "../../assets/images/character.jpeg";

const Home = () => {
  return (
    <main>
      <div className="container home">
        <h1>Marvel world :</h1>
        <section>
          <article className="__card">
            <img src={readingComicFirst} alt="Marvel reading a comic" />
          </article>
          <article className="__card">
            <img src={readingComicSecond} alt="Marvel reading a comic" />
          </article>
          <Link to="/comics">
            <article className="__card">
              <div className="__card-infos">
                <article className="__card-image">
                  <img src={comic} alt="Comic" />
                </article>
                <div>
                  <p>Click here to see all comics...</p>
                </div>
              </div>
            </article>
          </Link>
        </section>
        <section>
          <Link to="/characters">
            <article className="__card">
              <div className="__card-infos">
                <article className="__card-image">
                  <img src={character} alt="Comic" />
                </article>
                <div>
                  <p>Click here to see all characters...</p>
                </div>
              </div>
            </article>
          </Link>
          <article className="__card">
            <img src={heroFirst} alt="Hero from Marvel" />
          </article>
          <article className="__card">
            <img src={heroSecond} alt="Hero from Marvel" />
          </article>
        </section>
        <section>
          <article className="__card">
            <img src={stanLeeFirst} alt="Stan Lee in Comic" />
          </article>
          <article className="__card">
            <img src={stanLeeSecond} alt="Stan Lee in Comic" />
          </article>
          <article className="__card">
            <img src={stanLeeThird} alt="Stan Lee in Comic" />
          </article>
        </section>
      </div>
    </main>
  );
};

export default Home;
