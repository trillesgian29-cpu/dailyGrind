# Lingguhang Grind — Weekly Planner

Personal na weekly planner mo: workout, meals, at palengke schedule, may progress rings at habit tracker. Plain HTML/CSS/JS lang — walang build step, walang framework, kaya deretso na sa GitHub tapos i-deploy sa Vercel.

Naka-save ang mga checkmarks sa browser mo mismo (localStorage), kaya kahit private site mo lang ito, walang ibang nakakakita ng progress mo.

## Mga Files

```
index.html   → structure ng page
style.css    → itsura (black theme)
script.js    → laman ng plano (araw, tasks, habits) + logic
README.md    → itong file
```

## I-edit ang laman ng plano

Buksan lang ang `script.js`, hanapin ang `WEEK_DATA` at `HABITS` sa taas — dun nakalagay lahat ng araw, activity, lunch/dinner, at tasks. Palitan lang ang text sa loob ng quotes kung gusto mong baguhin.

## 1. I-upload sa GitHub

1. Gumawa ng bagong repository sa [github.com/new](https://github.com/new) (hal. `weekly-grind`).
2. Sa iyong computer, sa loob ng folder na ito:
   ```bash
   git init
   git add .
   git commit -m "Unang bersyon ng weekly planner"
   git branch -M main
   git remote add origin https://github.com/<username>/weekly-grind.git
   git push -u origin main
   ```
   (Palitan ang `<username>` ng GitHub username mo.)

   Kung ayaw mo gumamit ng terminal, pwede mo ring i-drag-and-drop ang tatlong files (`index.html`, `style.css`, `script.js`) diretso sa GitHub website gamit ang "Add file → Upload files".

## 2. I-deploy sa Vercel

1. Pumunta sa [vercel.com](https://vercel.com) at mag-sign in gamit ang GitHub account mo.
2. I-click ang **Add New → Project**.
3. Piliin ang repository na ginawa mo (`weekly-grind`).
4. Walang kailangang i-configure — static HTML ito, awtomatikong makikilala ni Vercel. I-click lang ang **Deploy**.
5. Pagkatapos ng ilang segundo, may lalabas na live link (hal. `weekly-grind.vercel.app`) — ito na ang website mo.

Bawat push mo sa GitHub (`git push`), awtomatikong mag-a-update ang Vercel site mo.

## Alternatibo: GitHub Pages (kung ayaw mo gumamit ng Vercel)

1. Sa repository settings sa GitHub, pumunta sa **Pages**.
2. Sa ilalim ng "Source", piliin ang `main` branch, folder na `/root`, tapos **Save**.
3. Maghintay ng 1-2 minuto, lalabas ang link sa parehong page.
