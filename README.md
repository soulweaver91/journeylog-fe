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
- Edit `homepage` in `package.json` if you set any subfolder to `REACT_APP_URL_PREFIX` in production
- `npm start`
- Start editing
  
Long guide: see `README-CRA.md`.

Deployment
----------

- `npm run build --production`
- Copy the entirety of `build/` to the target location
