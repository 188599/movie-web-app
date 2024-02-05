# MovieWebApp

Design document:

Using Angular 16 create a web application, for movies, based on the
requirements below:
- Main Movies View (also landing page)
  - See a list of the movie thumbnails with movie details
  - Add sorting capabilities:
    - Sort by title
    - Sort by release date
  - Add a “Add to Watchlist” button that will add the movie to a
special list dedicated to the user
  - The watchlist should be stored in local storage
  - On each movie thumbnail show a label “On my watchlist” if that’s
the case
- Clicking on a movie thumbnail should:
  - Take you to a “Movie Details” component
  - Use routing to obtain this
  - Show the movie details & image as well as the movie trailer
(youtube embedded video)
  - Show a toggle button for “Add to Watchlist”
