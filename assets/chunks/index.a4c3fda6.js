import{r as u,l as r}from"../app.48dd6b35.js";function f(e,l=500){const a=u(e.value),t=u(e.value);return r(e,s=>{s?(a.value=!0,setTimeout(()=>{t.value=!0},20)):(t.value=!1,setTimeout(()=>{a.value=!1},l))}),{realData:a,delayData:t}}export{f as u};
