<template>
  <div id="Loader" class="loading-page">
    <svg class="Loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle class="external-circle" cx="60" cy="60" r="50" />
      <circle class="internal-circle" cx="60" cy="60" r="30" />
    </svg>
  </div>
</template>

<script>
export default {
  data: () => ({
    loadingLoader: false
  }),
  methods: {
    start () {
      this.loadingLoader = true
    },
    finish () {
      this.loadingLoader = false
    }
  }
}
</script>

<style>
#Loader {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.Loader {
  width: 120px;
  height: 120px;
  transform: rotate(90deg);
  stroke-linecap: round;
  stroke-width: 2.5;
  fill: none;
}
.fade-out-click{
    margin: 0 10% 10% 0;
}
  .internal-circle,
  .external-circle {
    stroke: #ffffff;
    stroke-dashoffset: 0;
    transform-origin: center;
  }
  .internal-circle {
    stroke-dasharray: 187;
    -webkit-animation: internal 3s ease-in-out infinite;
    -moz-animation: internal 3s ease-in-out infinite;;
    animation: internal 3s ease-in-out infinite;
    opacity: .5;
  }
  .external-circle {
    stroke-dasharray: 312;
    -webkit-animation: external 5s linear infinite;
    -moz-animation: external 5s linear infinite;
    animation: external 5s linear infinite;
  }
  .external-circle-active{
    stroke: transparent;
    transform-origin: center;
    -webkit-animation: leave .35s linear 1 forwards;
    -moz-animation: leave .35s linear 1 forwards;
    animation: leave .35s linear 1 forwards;
  }
  .external-loader-active{
    background-color: #2234ae;
    background-image: linear-gradient(315deg,#020299, 33%, #ff0066 66%);
    border-radius: 50%;
    filter: blur(1.5px);
    -webkit-animation: animate 1s linear 1 forwards, pulse 1s 1 forwards;
    -moz-animation: animate 1s linear 1 forwards, pulse 1s 1 forwards;
    animation: animate 1s linear 1 forwards, pulse 1s 1 forwards;
  }
  @-webkit-keyframes animate {
      0% {
          transform: rotate(0deg);
      }
      100% {
        transform: rotate(270deg);
      }
  }
  @-moz-keyframes animate {
      0% {
          transform: rotate(0deg);
      }
      100% {
        transform: rotate(270deg);
      }
  }
  @keyframes animate {
      0% {
          transform: rotate(0deg);
      }
      100% {
        transform: rotate(270deg);
      }
  }
  @-webkit-keyframes pulse {
    0% {
        opacity: .7;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
  }
  @-moz-keyframes pulse {
    0% {
        opacity: .7;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
  }
  @keyframes pulse {
    0% {
        opacity: .7;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
  }
  @-webkit-keyframes leave {
    0% {
        opacity: .1;
    }
    100% {
        opacity: 1;
    }
  }
  @-moz-keyframes leave {
    0% {
        opacity: .1;
    }
    100% {
        opacity: 1;
    }
  }
  @keyframes leave {
    0% {
        opacity: .1;
    }
    100% {
        opacity: 1;
    }
  }
@-webkit-keyframes internal {
  0% {
    stroke-dashoffset: 0;
  }
  35% {
    stroke-dashoffset: -70;
  }
  100% {
    stroke-dashoffset: -187;
    transform: rotate(1440deg);
  }
}
@-moz-keyframes internal {
  0% {
    stroke-dashoffset: 0;
  }
  35% {
    stroke-dashoffset: -70;
  }
  100% {
    stroke-dashoffset: -187;
    transform: rotate(1440deg);
  }
}
@keyframes internal {
  0% {
    stroke-dashoffset: 0;
  }
  35% {
    stroke-dashoffset: -70;
  }
  100% {
    stroke-dashoffset: -187;
    transform: rotate(1440deg);
  }
}
@-webkit-keyframes external {
  0% {
    stroke-dashoffset: 312;
  }
  60% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: -312;
    transform: rotate(1800deg);
  }
}
@-moz-keyframes external {
  0% {
    stroke-dashoffset: 312;
  }
  60% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: -312;
    transform: rotate(1800deg);
  }
}
@keyframes external {
  0% {
    stroke-dashoffset: 312;
  }
  60% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: -312;
    transform: rotate(1800deg);
  }
}
</style>