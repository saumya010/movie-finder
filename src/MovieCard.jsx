const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23343739'/%3E%3Ctext x='50%25' y='50%25' fill='%23f9d3b4' font-family='sans-serif' font-size='20' text-anchor='middle' dominant-baseline='middle'%3ENo Poster%3C/text%3E%3C/svg%3E";

const formatYear = (year) => {
  if (year.endsWith("–") || year.endsWith("-")) {
    return `${year.slice(0, -1)}–Ongoing`;
  }
  return year;
};

const MovieCard = ({ movie: { Title, Year, Poster, Type } }) => {
  return (
    <div className="movie">
      <div className="year">
        <p>{formatYear(Year)}</p>
      </div>
      <div className="poster">
        <img
          src={Poster !== "N/A" ? Poster : PLACEHOLDER}
          alt={Title}
          loading="lazy"
          onError={(e) => {
            if (e.target.src !== PLACEHOLDER) {
              e.target.src = PLACEHOLDER;
            }
          }}
        />
      </div>
      <div className="meta">
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
