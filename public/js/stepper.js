'use strict';

function init() {
  var shepherd = setupShepherd();
  setTimeout(function() {
    shepherd.start();
  }, 100);
}

function initForecaster(){
  var shepherd = setupShepherdForecaster();
  setTimeout(function() {
    shepherd.start();
  }, 100);
}

function initDigitalipadvisor(){
  var shepherd = setupShepherdDigitalipadvisor();
  setTimeout(function() {
    shepherd.start();
  }, 100);
}

function initReport(){
  var shepherd = setupShepherdReport();
  setTimeout(function() {
    shepherd.start();
  }, 100);
}

function setupShepherd() {
  var prefix = 'steps-';
  var shepherd = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'stepperStart',
      scrollTo: {
        behavior: 'smooth',
        block: 'center'
      },
      tippyOptions: {
        maxWidth: '400px',
        popperOptions: {
          modifiers: {
            foo: 'bar',
            preventOverflow: {
              escapeWithReference: false
            }
          }
        }
      }
    },
    classPrefix: prefix,
      // This should add the first tour step
      steps: [
      {
          // title: 'Including',
          text: 'Here is the main dashboard.',
          attachTo: {
            element: '#content',
            // on: 'bottom'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
          ],
          id: 'welcome'
        }
        ],
        styleVariables: {
          shepherdElementZIndex: 10,
          shepherdThemePrimary: '#00213b',
          shepherdThemeSecondary: '#e5e5e5'
        },
        useModalOverlay: true
      });

  const element = document.createElement('p');
  element.innerText = '';

    // These steps should be added via `addSteps`
    const steps = [
    {
      title: 'Report Panel',
      text: 'Here you can find your patent project reports.',
      attachTo: {
        element: '#reports .uk-card',
        on: 'right'
      },
      buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
      ],
      id: 'including'
    },
    {
      text: 'Here you can start a new patent project.',
      attachTo: {
        element: '#rightCard .uk-card',
        on: 'left'
      },
      buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Finish'
      }
      ],
      id: 'attaching'
    }
    ];

    shepherd.addSteps(steps);

    // This should add steps after the ones added with `addSteps`
    // shepherd.addStep({
    //   title: 'Centered Shepherd Element',
    //   text: 'But attachment is totally optional!\n       Without a target, a tour step will create an element that\'s centered within the view.       Check out the <a href="https://shepherdjs.dev/docs/">documentation</a> to learn more.',
    //   buttons: [
    //     {
    //       action: function() {
    //         return this.back();
    //       },
    //       secondary: true,
    //       text: 'Back'
    //     },
    //     {
    //       action: function() {
    //         return this.next();
    //       },
    //       text: 'Next'
    //     }
    //   ],
    //   id: 'centered-example'
    // });

    return shepherd;
  }


  function setupShepherdForecaster() {
    var prefix = 'steps-';
    var shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'stepperStart',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        },
        tippyOptions: {
          maxWidth: '400px',
          popperOptions: {
            modifiers: {
              foo: 'bar',
              preventOverflow: {
                escapeWithReference: false
              }
            }
          }
        }
      },
      classPrefix: prefix,
      // This should add the first tour step
      steps: [
      {
          // title: 'Including',
          title: 'Forecaster Chart',
          text: 'Welcome to the forecaster! This displays how much we estimate your patent will cost and over how long.',
          attachTo: {
            element: '.stepper_1',
            on: 'right'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
          ],
          id: 'welcome'
        }
        ],
        styleVariables: {
          shepherdElementZIndex: 10,
          shepherdThemePrimary: '#00213b',
          shepherdThemeSecondary: '#e5e5e5'
        },
        useModalOverlay: true
      });

    const steps = [
    {
      title: 'Adjustments',
      text: 'You can adjust these sliders to match your potential patent and get a more accurate estimate.',
      attachTo: {
        element: '.stepper_2',
        on: 'right'
      },
      buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
      ],
      id: 'including'
    },
    {
      title: 'Cost Breakdown',
      text: 'Here you can see a breakdown of costs and estimated timeline.',
      attachTo: {
        element: '.stepper_3',
        on: 'left'
      },
      buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Finish'
      }
      ],
      id: 'attaching'
    }
    ];

    shepherd.addSteps(steps);

    return shepherd;
  }


  function setupShepherdDigitalipadvisor() {
    var prefix = 'steps-';
    var shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'stepperStart',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        },
        tippyOptions: {
          maxWidth: '400px',
          popperOptions: {
            modifiers: {
              foo: 'bar',
              preventOverflow: {
                escapeWithReference: false
              }
            }
          }
        }
      },
      classPrefix: prefix,
      // This should add the first tour step
      steps: [
      {
          // title: 'Including',
          text: 'This form will ask you information about your patent project. This helps us build a tailored report for you.',
          attachTo: {
            element: '.stepper_1',
            on: 'bottom'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Finish'
          }
          ],
          id: 'welcome'
        }
        ],
        styleVariables: {
          shepherdElementZIndex: 10,
          shepherdThemePrimary: '#00213b',
          shepherdThemeSecondary: '#e5e5e5'
        },
        useModalOverlay: true
      });

    return shepherd;
  }


  function setupShepherdReport() {
    var prefix = 'steps-';
    var shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'stepperStart',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        },
        tippyOptions: {
          maxWidth: '400px',
          popperOptions: {
            modifiers: {
              foo: 'bar',
              preventOverflow: {
                escapeWithReference: false
              }
            }
          }
        }
      },
      classPrefix: prefix,
      // This should add the first tour step
      steps: [
      {
          // title: 'Including',
          text: 'Here you can see information you submitted about your patent project.',
          attachTo: {
            element: '.stepper_1',
            on: 'right'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
          ],
          id: 'welcome'
        },
        {
          // title: 'Including',
          text: 'This is a summary of your custom report. Use this to understand key action items.',
          attachTo: {
            element: '.stepper_2',
            on: 'left'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
          ],
          id: 'welcome'
        },
        {
          // title: 'Including',
          text: 'This is your custom report which contains the information you need to know when getting a patent. Including important dates.',
          attachTo: {
            element: '.stepper_3',
            on: 'top'
          },
          scrollTo: {
            behavior: 'smooth',
            block: 'top'
          },
          buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Finish'
          }
          ],
          id: 'welcome'
        }
        ],
        styleVariables: {
          shepherdElementZIndex: 10,
          shepherdThemePrimary: '#00213b',
          shepherdThemeSecondary: '#e5e5e5'
        },
        useModalOverlay: true
      });

    return shepherd;
  }

  function ready() {
      if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        init();
      } else {
        document.addEventListener('DOMContentLoaded', init);
      }
  }

  function readyForecaster() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      initForecaster();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

  function readyDigitalipadvisor() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      initDigitalipadvisor();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

  function readyReport() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      initReport();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

