# Princeton Baking Bad — ready to upload

Every photo, video, poster, mascot and logo you sent is converted, renamed and
in place. All five pages were rendered and checked: no broken images, no
missing files, nothing spilling off the screen on mobile.

**Upload the whole folder as-is and the site works.**

---

## Why your files got converted

Two of the formats your iPhone produces don't work on the web, and both fail
in a way that's hard to diagnose — the page loads fine, the media just doesn't
appear.

- **HEIC photos** → converted to **JPG**. Chrome and Firefox can't display HEIC
  at all.
- **HEVC .MOV videos** → converted to **H.264 .mp4**. Same story: HEVC is an
  Apple-first codec that most browsers refuse. H.264 is the one format every
  browser has supported for over a decade.

I also resized everything for the web. Nothing lost visually at the size these
display, but the difference matters a lot on a phone connection:

| | before | after |
|---|---|---|
| Photos (17) | 30.9 MB | 4.3 MB |
| Videos (4) | 37.3 MB | 3.4 MB |
| Logo + mascots + posters | 2.9 MB | 1.1 MB |
| **Whole site** | **~71 MB** | **9 MB** |

The videos were also stripped of audio (they play muted on the page anyway) and
given "faststart" so they begin playing before fully downloading.

## Where everything went

| Your file | Became | Used on |
|---|---|---|
| `Baking_Bad_Logo_Transparent.PNG` | `logo.png` | header, footer, hero, browser tab |
| `Tiger_Logo_Transparent.PNG` | `mascot-whisk.png` | video badges, footer, seasons |
| `Tiger_Logo_2.png` | `mascot-peek.png` | hero, "what we get up to", talking tiger |
| `Santa_Tiger_Baking_Bad.PNG` | `mascot-santa.png` | Winter card, Cultural Diversity |
| `Valentine_s_Day_Tiger_Baking_Bad.PNG` | `mascot-valentine.png` | February card, More Info |
| `french.png` | `poster-french.jpg` | Cultural Diversity |
| `princetonpoland.png` | `poster-princetonpoland.jpg` | Cultural Diversity |
| `bibinka.png` | `poster-bibinka.jpg` | Cultural Diversity |
| `cla.png` | `poster-cla.jpg` | Cultural Diversity |
| `vsa.png` | `poster-vsa.jpg` | Cultural Diversity |
| 13 `IMG_*.HEIC` | `IMG_*.jpg` | Gallery |
| 4 `IMG_*.HEIC` | `IMG_*.jpg` | "Recent bakes" on the homepage |
| 4 `IMG_*.MOV` | `IMG_*.mp4` + poster frames | the four clips on the homepage |

**Not used** (they weren't website assets):
- `Color_Palette.png` — those five colours are already written into `styles.css`
- `meettheteam.png` — a screenshot of a different site's team page

## One substitution you should know about

The homepage hero was built around `images/tigers.png`, a wide photo of the two
Princeton tiger statues wearing chef hats. That file was never among the ones
you sent, so rather than leave a broken image in the most prominent spot on the
site, I put your peeking tiger mascot there with a single chef hat on its head.

When you have a statues photo you're free to use, it's a two-step swap:

1. In `index.html`, find the hero mascot block and restore the commented-out
   version sitting right below it.
2. In `styles.css`, delete the short "Hero mascot stand-in" section at the very
   bottom.

Both spots are marked with comments explaining this.

**Make sure the photo is one you're allowed to publish.** A photo pulled from a
web search is almost always somebody's copyrighted work, and a watermark across
the corner is a clear sign of it. Safe sources, in order of ease:

- **Take it yourself.** The statues are on campus. A club photo is free, yours
  forever, and more fitting for a club site than stock anyway.
- Ask Princeton Communications whether a university photo can be used by a
  student organization.
- Buy a licence from the photographer directly.

**What shape to aim for:** a wide landscape crop, both tigers side-on, roughly
2:1 or wider, with a bit of empty space above their heads for the chef hats to
sit in. The two hats are positioned in `styles.css` at `.hat-left` and
`.hat-right` — nudge those `left`/`top` percentages until they land on the
heads. A transparent-background PNG looks best, but a JPG works fine too (if
you use a JPG, change the filename in `index.html` to match).

---

## Putting it on GitHub Pages

1. Create a new **Public** repository on github.com — `baking-bad` is a fine
   name. Tick "Add a README file".
2. **Add file → Upload files**, then drag in everything from this folder,
   including the `images` and `videos` folders themselves.
3. Commit.
4. **Settings → Pages**, set Source to *Deploy from a branch*, branch **main**,
   folder **/ (root)**, Save.
5. Wait 1–3 minutes. Your URL appears at the top of that same screen:
   `https://YOUR-USERNAME.github.io/baking-bad/`

Want to preview first? Double-click `index.html`. The whole site works locally,
though the videos may not autoplay until it's actually online — that's a
local-file quirk, not a fault.

## The two things still left to write

Neither breaks anything; both are just placeholder text right now.

**Officer team** (`officers.html`) — six blank cards. For each:

```html
<div class="ring"><div class="ring-inner"><img src="images/jane-doe.jpg" alt="Jane Doe"></div></div>
<span class="name-line">Jane Doe</span>
<span class="role-line">Co-President</span>
```

Their bio replaces `Bio coming soon.` on the back of the card. Fewer than six
officers? Delete a whole `<div class="member reveal">…</div>`. More? Copy one
and paste it. Once they're filled in, delete the "This page is still proofing"
box near the bottom of the page.

Officer headshots go in `images/` — and remember to export them as JPG or PNG,
not HEIC.

**Contact details** (`more-info.html`) — four cards currently read *"Add the
club email here"* and similar, in light brown italics. Replace those lines. For
a clickable email:

```html
<p><a href="mailto:bakingbad@princeton.edu">bakingbad@princeton.edu</a></p>
```

Further down the same page, the "A few practical things" card is where meeting
times, dues, and allergy/dietary notes go.

## Updating it later

Edit the file → upload it → wait a minute → refresh. If your change doesn't
show, hard-refresh with **Ctrl+Shift+R** (**Cmd+Shift+R** on Mac). Browsers
cache stylesheets aggressively and this catches almost everyone out at least
once.
