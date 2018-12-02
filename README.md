JourneyLog frontend module
==========================

This package provides the frontend to the JourneyLog software. The backend package can be found
[here](https://github.com/soulweaver91/journeylog-be).

Requirements
------------

- A recent version of Node.js
- A [Font Awesome Pro](https://fontawesome.com/pro) license and their private repositories properly set up in your
  npm configuration. You might be able to substitute it with the free FA license, but I haven't tried that out, so
  no guarantees there.
- `npm install`

Development
-----------

Quick guide:
- Create `.env.development` and `.env.production`, define `REACT_APP_API_URL` (API root URL) and `REACT_APP_URL_PREFIX`
  (deployment location subdirectory the files go to)
- Edit `homepage` in `package.json` to match your `REACT_APP_URL_PREFIX`
- `npm start`
- Start editing
  
Long guide: see `README-CRA.md`.

Deployment
----------

- `npm run build`
- Copy the entirety of `build/` to the target location
