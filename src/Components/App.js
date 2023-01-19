import React from "react";
import Menu from "./Menu";
import Game from "./Game";

function App() {
  const tsParticles = window.tsParticles;

  // prevenir que só é chamado uma vez, quando a página é carregada
  React.useEffect(() => {
    tsParticles.load("tsparticlesCursor", {
      fullScreen: {
        enable: true,
        zIndex: 100
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 0,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#deeeff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 3,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 6,
          random: {
            enable: true,
            minimumValue: 5
          },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 5,
            sync: true,
            startValue: "min",
            destroy: "max"
          }
        },
        links: {
          enable: false
        },
        move: {
          enable: true,
          speed: 3.5,
          direction: "none",
          random: false,
          straight: false,
          outMode: "destroy",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onhover: {
            enable: true,
            mode: "trail"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 200
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          },
          trail: {
            delay: 0.005,
            quantity: 5,
            pauseOnStop: true
          }
        }
      },
      retina_detect: true
    });
  });

  return (
    <React.Fragment>
      {/* MENU */}
      <div id="menuScreen">
        <Menu />
      </div>

      {/* JOGO */}
      <div className="gameScreen-container">
        <Game />
      </div>

      {/* PARTÍCULAS - CURSOR */}
      <div id="tsparticlesCursor"></div>
    </React.Fragment>
  );
}

export default App