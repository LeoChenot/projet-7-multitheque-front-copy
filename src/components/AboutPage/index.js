import './style.scss';

function AboutPage() {
  return (
    <div className="aboutPage">
      <h1 className="aboutPage__title">Présentation du projet</h1>
      <p className="aboutPage__text">
        Collectio est un site qui a pour but de permettre à ses utilisateurs de rechercher des oeuvres d’horizons variés (films, séries, livres, jeux vidéos…), d'accéder à leurs informations à partir d’API existantes, de se constituer une multithèque (qu’on appellera Collection), et d’y accéder dans un unique espace au visuel moderne, rappelant une bibliothèque ou vidéothèque physique.
        <br />
        <br />
        Cet espace dédié sera une vitrine des différentes passions et intérêts de nos utilisateurs sur une seule et même plateforme, à l’inverse de la plupart des grands sites communautaires qui se spécialisent autour d’un unique média.
        Ce projet ambitieux possède un ensemble de potentielles fonctionnalités futures qui ne seront pas implémentées dans sa première itération mais lui permettront d'évoluer avec le temps, grâce à un travail de développement à la suite du projet de fin d'études.
      </p>
    </div>
  );
}

export default AboutPage;
