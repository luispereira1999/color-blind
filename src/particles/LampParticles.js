const lampParticles = {
  fullScreen: {
    enable: true
  },
  background: {
    opacity: 0
  },
  fpsLimit: 90,
  emitters: {
    autoPlay: false,
    name: "light",
    direction: "top",
    life: {
      duration: 0.1,
    },
    rate: {
      delay: 0.35,
      quantity: 9
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
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
      value: 100,
      random: {
        enable: true,
        minimumValue: 100
      },
      animation: {
        enable: true,
        speed: 20,
        minimumValue: 100,
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
      speed: 40,
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
  detectRetina: true
};

export default lampParticles