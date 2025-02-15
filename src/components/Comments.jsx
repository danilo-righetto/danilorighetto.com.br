import { useDarkModeControl } from "@src/infra/DarkModeControl/DarkModeControl";
import React from 'react';

export const Comments = ({ slug }) => {
  const runnedOnce = React.useRef(false);
  const ref = React.useRef();
  const darkModeControl = useDarkModeControl();

  React.useEffect(() => {
    const scriptId = "utterances-comments";
    if (!runnedOnce.current) {
      runnedOnce.current = true;
      const isDarkModeInLocalStorage = localStorage.getItem('isDarkMode');
      const theme = isDarkModeInLocalStorage
        ? isDarkModeInLocalStorage === 'true' ? 'github-dark' : 'github-light'
        : "preferred-color-scheme";
      const hasCommentsContainer = Boolean(document.body.querySelector(`.utterances-frame`));
      const hasScript = Boolean(document.body.querySelector(`#${scriptId}`));
      const script = document.createElement('script');

      const config = {
        id: scriptId,
        src: 'https://utteranc.es/client.js',
        repo: 'danilo-righetto/danilorighetto.com.br',
        'issue-term': `comments/${slug}`,
        label: "comments",
        theme,
        crossOrigin: 'anonymous',
        async: true
      };

      Object.entries(config).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      if (!hasCommentsContainer && !hasScript) ref.current.appendChild(script);
    }

    return () => {
      const hasScript = Boolean(document.body.querySelector(`#${scriptId}`));
      const hasCommentsContainer = Boolean(document.body.querySelector(`.utterances-frame`));
      if (hasCommentsContainer) {
        const commentsContainers = document.body.querySelectorAll(`.utterances`);
        commentsContainers.forEach((commentsContainer) => commentsContainer?.remove?.());
      }

      if (hasScript) {
        setTimeout(() => {
          const script = document.body.querySelector(`#${scriptId}`);
          script?.remove?.();
        }, 50);
      }
    }
  }, [darkModeControl.isDarkMode, slug]);

  return <div className="mt-4">
    <div id="comments-area" ref={ref} />
  </div>;
};