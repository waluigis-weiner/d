$(function(){
  var canvas2d = $("#canvas2d")[0];
  var ctx = canvas2d.getContext("2d");

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  // i in [0,1], return b when i = 1, a when i = 0
  function intp(a, b, i){
    if(typeof a !== "number") {
      // console.log("attempted to interpolate between "+a+" and "+b);
      // console.log("typeof a = "+(typeof a));
      // console.log("typeof b = "+(typeof b));
      return a
    }
    return a*(1-i) + b*i
  }

  function easelvl4(a) {
    return 1-Math.pow(1-a, 4);
  }
  function easelvl2(a) {
    return 1-Math.pow(1-a, 2);
  }
  function easeinlvl2(a) {
    return Math.pow(a, 1.3);
  }

  OLD_ASSETS = {
    "drop_f0..8": {
      src: "assets/droplet/f%d.png"
    },
    "bdrop_f0..8": {
      src: "assets/droplet/blurred/f%d.png"
    },
    "red_clouds": {
      src: "assets/clouds/red_clouds.jpg"
    },
    "stars_f1..8": {
      src: "assets/stars/stars_f%d.jpg"
    },
    "sammel": {
      src: "assets/symbology/sammel.png"
    },
    "treeoflife": {
      src: "assets/symbology/treeoflife.png"
    },
    "flame_0001..0042": {
      src: "assets/flame/%d.png"
    },
    "flameblur_0001..0042": {
      src: "assets/flameblur/%d.png"
    },
    "flare_0..3": {
      src: "assets/flare/flare%d.png"
    },
    "flashy_0001..0036": {
      src: "assets/flashyintro/%d.jpg"
    },
    "ngeflare_1..5": {
      src: "assets/genesislensflare/%d.jpg"
    },
    "ngeflare_black": {
      src: "assets/genesislensflare/black.jpg"
    },
    "ngelogo": {
      src: "assets/logo.png"
    },
    "ngelogo_glow": {
      src: "assets/logoglow.jpg"
    },
    "ngelogo_glowopacity": {
      src: "assets/logoglowopacity.png"
    },
    "hitflash_1..9": {
      src: "assets/hitflashes/flash%d.jpg"
    },
    "clouds1..2": {
      src: "assets/clouds%d.jpg"
    },
    "shinjisil": {
      src: "assets/shinjisil.png"
    },
    "shinji_profile_3": {
      src: "assets/shinjiprofile/profile_3.png"
    },
    "ausna_sil": {
      src: "assets/silhouettes/ausna.png"
    },
    "rei_sil": {
      src: "assets/silhouettes/rei.png"
    }
  };

  ASSETS = {};

  TEXT_ASSETS = {
    "evangelion": "GUNKSQUAD",
    "gainax": "GAINAX",
    "ngejap": "\u4EB2\u65A4\u4E16\u7CF8\u5DF1"
  };

  TWEENS = {
    "gainax": [
      {
        ctxattr: "globalAlpha",
        stops: [
          {
            frame: 69,
            "globalAlpha": 0
          },
          {
            frame: 77,
            "globalAlpha": 1
          },
          {
            frame: 149,
            "globalAlpha": 1
          },
          {
            frame: 158,
            "globalAlpha": 0
          }
        ]
      }
    ],
    "projecteva": [
      {
        ctxattr: "globalAlpha",
        stops: [
          {
            frame: 246,
            "globalAlpha": 0
          },
          {
            frame: 250,
            "globalAlpha": 1
          },
          {
            frame: 327,
            "globalAlpha": 1
          },
          {
            frame: 335,
            "globalAlpha": 0
          }
        ]
      },
      {
        ctxattr: "textAlign",
        stops: [{frame:0,"textAlign":"left"}]
      }
    ]
  };

  FRAMES = {
    "0..70": [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        color: "#3A3A3A",
        zindex: 0
      }
    ],
    "0..25": [
      {
        type: "image",
        asset: "drop_f0",
        x: 0,
        y: 0,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 0,
                "globalAlpha": 0
              },
              {
                frame: 25,
                "globalAlpha": 1
              }
            ]
          }
        ]
      }
    ],
    "26..34": [
      {
        type: "image",
        asset: "drop_f1,drop_f2,drop_f3,drop_f4,drop_f5,drop_f6,drop_f6,drop_f7,drop_f7",
        offset: 26,
        x: 0,
        y: 0,
        zindex: 1
      }
    ],
    "35..45": [
      {
        type: "image",
        asset: "drop_f8",
        x: 360,
        y: 240,
        bbw: 720,
        bbh: 480,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 35,
                "globalAlpha": 1
              },
              {
                frame: 45,
                "globalAlpha": 0
              }
            ]
          },
          {
            attr: "sbw,sbh",
            stops: [
              {
                frame: 35,
                "sbw": 1,
                "sbh": 1
              },
              {
                frame: 45,
                "sbw": 1.05,
                "sbh": 1.05
              }
            ]
          }
        ]
      }
    ],
    "50..190": [
      {
        type: "image",
        asset: "red_clouds",
        x: 360,
        y: 240,
        bbw: 720,
        bbh: 480,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 50,
                "globalAlpha": 0
              },
              {
                frame: 65,
                "globalAlpha": 1
              },
              {
                frame: 170,
                "globalAlpha": 1
              },
              {
                frame: 190,
                "globalAlpha": 0
              }
            ]
          },
          {
            attr: "sbw,sbh",
            stops: [
              {
                frame: 50,
                "sbw": 1,
                "sbh": 1
              },
              {
                frame: 190,
                "sbw": 1.5,
                "sbh": 1.5
              }
            ]
          }
        ]
      }
    ],
    "69..160": [
      {
        type: "text",
        textasset: "gainax",
        font: "70px matisse2, serif",
        color: "#ffffff",
        x: 360,
        y: 300,
        zindex: 2,
        tweens: TWEENS.gainax
      },
      {
        type: "text",
        text: "\u4F1A\u753B \u00B7 \u682A\u5F0F",
        font: "35px matisse2, serif",
        color: "#ffffff",
        x: 360,
        y: 220,
        zindex: 2,
        tweens: TWEENS.gainax
      }
    ],
    "100..158": [
      {
        type: "image",
        asset: "sammel",
        x: 360,
        y: 320,
        bbw: 672,
        bbh: 583,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 100,
                "globalAlpha": 0
              },
              {
                frame: 107,
                "globalAlpha": 0.25
              },
              {
                frame: 150,
                "globalAlpha": 0.25
              },
              {
                frame: 158,
                "globalAlpha": 0
              }
            ]
          },
          {
            attr: "sbw,sbh,y",
            stops: [
              {
                frame: 100,
                "sbw": 0.95,
                "sbh": 0.95,
                "y": 320
              },
              {
                frame: 158,
                "sbw": 0.4,
                "sbh": 0.4,
                "y": 200
              }
            ]
          }
        ]
      }
    ],
    "71..338": [
      {
        type: "image",
        asset: "stars_f1..8",
        rate: 0.5,
        x: 0,
        y: 0,
        zindex: 0
      }
    ],
    "175..250": [
      {
        type: "image",
        asset: "treeoflife",
        x: 360,
        y: 320,
        bbw: 762,
        bbh: 1406,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 175,
                "globalAlpha": 0
              },
              {
                frame: 185,
                "globalAlpha": 0.35
              },
              {
                frame: 240,
                "globalAlpha": 0.35
              },
              {
                frame: 250,
                "globalAlpha": 0
              }
            ]
          },
          {
            attr: "sbw,sbh,y",
            stops: [
              {
                frame: 175,
                "sbw": 0.95,
                "sbh": 0.95,
                "y": -300
              },
              {
                frame: 250,
                "sbw": 1.3,
                "sbh": 1.3,
                "y": 840
              }
            ]
          }
        ]
      }
    ],
    "246..338": [
      {
        type: "image",
        asset: "flame_0001..0042",
        offset: 4,
        rate: 0.5,
        x: 360,
        y: 240,
        bbw: 474,
        bbh: 463,
        sbw: 1.2,
        sbh: 1.2,
        zindex: 3,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "lighten"}]
          },
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 246,
                "globalAlpha": 0
              },
              {
                frame: 280,
                "globalAlpha": 1
              },
              {
                frame: 334,
                "globalAlpha": 1
              },
              {
                frame: 338,
                "globalAlpha": 0
              }
            ]
          }
        ]
      },
      {
        type: "image",
        asset: "flameblur_0001..0042",
        offset: 4,
        rate: 0.5,
        x: 360,
        y: 240,
        bbw: 474,
        bbh: 463,
        sbw: 1.2,
        sbh: 1.2,
        zindex: 4,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 246,
                "globalAlpha": 0
              },
              {
                frame: 290,
                "globalAlpha": 0.6
              },
              {
                frame: 334,
                "globalAlpha": 1
              },
              {
                frame: 338,
                "globalAlpha": 0
              }
            ]
          },
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          }
        ]
      },
      {
        type: "text",
        text: "\u682A\u5F0F\tProject Eva.\n\n\u4F1A\u753B\t\u7FFB\u8A33\u3057\n\t\u306A\u3044\u624B\u6BB5",
        font: "60px matisse2_thin, serif",
        tabwidth: 140,
        newlinewidth: 70,
        color: "#ffffff",
        x: 190,
        y: 160,
        zindex: 5,
        tweens: TWEENS.projecteva
      },
      {
        type: "rect",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        color: "#3A3A3A",
        zindex: 2,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          },
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 246,
                "globalAlpha": 0
              },
              {
                frame: 337,
                "globalAlpha": 1
              }
            ]
          }
        ]
      }
    ],
    "333": [
      {
        type: "image",
        asset: "flare_0",
        x: 0,
        y: 0,
        zindex: 8
      }
    ],
    "334": [
      {
        type: "image",
        asset: "flare_1",
        x: 0,
        y: 0,
        zindex: 8
      }
    ],
    "335": [
      {
        type: "image",
        asset: "flare_2",
        x: 0,
        y: 0,
        zindex: 8
      }
    ],
    "336": [
      {
        type: "image",
        asset: "flare_3",
        x: 0,
        y: 0,
        zindex: 8
      }
    ],
    "335..338": [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        color: "#C3C6D5",
        zindex: 6,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 335,
                "globalAlpha": 0
              },
              {
                frame: 338,
                "globalAlpha": 1
              }
            ]
          }
        ]
      }
    ],
    "339..341": [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        color: "#C9D5D5",
        zindex: 6
      }
    ],
    "342..377": [
      {
        type: "image",
        asset: "flashy_0001..0036",
        offset: 18,
        x: 0,
        y: 0,
        zindex: 0
      }
    ],
    "367..377": [
      {
        type: "image",
        asset: "flashy_0032,flashy_0035,flashy_0006,flashy_0035,flashy_0006,flashy_0011",
        offset: 10,
        x: 0,
        y: 0,
        zindex: 10,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "lighten"}]
          },
        ]
      },
      {
        type: "text",
        textasset: "evangelion",
        font: "88px mermaid, serif",
        color: "#5A605C",
        x: 360,
        y: 230,
        zindex: 2,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 366,
                "globalAlpha": 0,
              },
              {
                frame: 370,
                "globalAlpha": 1,
              }
            ]
          }
        ]
      }
    ],
    "378..555": [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        color: "#191F1D",
        zindex: 0
      },
      {
        type: "text",
        textasset: "evangelion",
        font: "88px mermaid, serif",
        color: "#ffffff",
        x: 360,
        y: 230,
        zindex: 2
      }
    ],
    "413..431": [
      {
        type: "image",
        asset: "ngelogo_glowopacity",
        x: 360,
        y: 220,
        bbw: 720,
        bbh: 320,
        zindex: 4,
        tweens: [
          {
            attr: "sbw,sbh",
            warper: easelvl4,
            stops: [
              {
                frame: 413,
                "sbw": 10,
                "sbh": 10
              },
              {
                frame: 431,
                "sbw": 1,
                "sbh": 1
              }
            ]
          }
        ]
      },
      {
        type: "image",
        asset: "ngelogo_glow",
        x: 360,
        y: 220,
        bbw: 720,
        bbh: 550,
        zindex: 3,
        tweens: [
          {
            attr: "sbw,sbh",
            warper: easelvl4,
            stops: [
              {
                frame: 413,
                "sbw": 10,
                "sbh": 10
              },
              {
                frame: 431,
                "sbw": 1,
                "sbh": 1
              }
            ]
          },
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          }
        ]
      }
    ],
    "432..555": [
      {
        type: "image",
        asset: "ngelogo",
        x: 360,
        y: 220,
        bbw: 720,
        bbh: 320,
        zindex: 4
      }
    ],
    "455..464": [
      {
        type: "image",
        asset: "ngeflare_1,ngeflare_3,ngeflare_black,ngeflare_4,ngeflare_black,ngeflare_3,ngeflare_2,ngeflare_black,ngeflare_5,ngeflare_2",
        offset: 455,
        x: 0,
        y: 0,
        zindex: 10,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          },
        ]
      }
    ],
    "465..555": [
      {
        type: "text",
        textasset: "ngejap",
        font: "38px matisse2_thick, serif",
        color: "#191F1D",
        x: 410,
        y: 165,
        zindex: 6
      },
      {
        type: "text",
        textasset: "ngejap",
        font: "38px matisse2_thick, serif",
        color: "#ffffff",
        x: 410,
        y: 164,
        zindex: 5
      },
      {
        type: "text",
        textasset: "ngejap",
        font: "38px matisse2_thick, serif",
        color: "#ffffff",
        x: 409,
        y: 166,
        zindex: 5
      },
      {
        type: "text",
        textasset: "ngejap",
        font: "38px matisse2_thick, serif",
        color: "#ffffff",
        x: 411,
        y: 166,
        zindex: 5
      }
    ],
    "500..508": [
      {
        type: "image",
        asset: "drop_f1,drop_f2,drop_f3,drop_f4,drop_f5,drop_f6,drop_f6,drop_f7,drop_f7",
        offset: 500,
        x: 0,
        y: 0,
        zindex: 1
      },
      {
        type: "image",
        asset: "bdrop_f1,bdrop_f2,bdrop_f3,bdrop_f4,bdrop_f5,bdrop_f6,bdrop_f6,bdrop_f7,bdrop_f7",
        offset: 500,
        x: 0,
        y: 0,
        zindex: 20,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          },
          {
            ctxattr: "globalAlpha",
            stops:[
              { 
                frame: 500,
                "globalAlpha": "1"
              },
              { 
                frame: 505,
                "globalAlpha": "1"
              },
              { 
                frame: 509,
                "globalAlpha": "0"
              }
            ]
          }
        ]
      }
    ],
    "509..519": [
      {
        type: "image",
        asset: "drop_f8",
        x: 360,
        y: 240,
        bbw: 720,
        bbh: 480,
        zindex: 1,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 509,
                "globalAlpha": 1
              },
              {
                frame: 519,
                "globalAlpha": 0
              }
            ]
          },
          {
            attr: "sbw,sbh",
            stops: [
              {
                frame: 509,
                "sbw": 1,
                "sbh": 1
              },
              {
                frame: 519,
                "sbw": 1.05,
                "sbh": 1.05
              }
            ]
          }
        ]
      }
    ],
    "544..555": [
      {
        type: "rect",
        color: "#D3D9D9",
        x: 0,
        y: 0,
        w: 720,
        h: 480,
        zindex: 50,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 548,
                "globalAlpha": 0
              },
              {
                frame: 553,
                "globalAlpha": 1
              }
            ]
          }
        ]
      },
      {
        type: "image",
        asset: "hitflash_1..9",
        offset: 544,
        x: 0,
        y: 0,
        zindex: 20,
        tweens: [
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "screen"}]
          }
        ]
      }
    ],
    "556..915": [
      {
        type: "image",
        asset: "clouds1",
        x: 0,
        y: 0,
        zindex: 1,
        tweens: [
          {
            attr: "x,y",
            stops: [
              {
                frame: 556,
                "x": -180,
                "y": 0
              },
              {
                frame: 915,
                "x": 0,
                "y": -120
              }
            ]
          }
        ]
      }
    ],
    "556..620": [
      {
        type: "text",
        text: "\u30C0\u30DF\u30FC\u30B7\u30B9\u30C6\u30E0\u3067\n\n\u3092\u8D77\u52D5\u3055\u305B",
        font: "38px matisse2_thin, serif",
        color: "#ffffff",
        x: 368,
        y: 155,
        newlinewidth: 65,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"right"}]
          }
        ]
      },
      {
        type: "text",
        text: "\u5F53\u521D\u65B0\n\n\u56FD\u3067\u3042\u308B\n\u9023\u76F4\u516C\u5C5E",
        font: "60px matisse2_thin, serif",
        color: "#ffffff",
        x: 420,
        y: 160,
        newlinewidth: 65,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"left"}]
          }
        ]
      }
    ],
    "577..915": [
      {
        type: "image",
        asset: "shinji_profile_3",
        bbw: 720,
        bbh: 480,
        x: 360,
        y: 240,
        zindex: 2,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 577,
                "globalAlpha": 0
              },
              {
                frame: 592,
                "globalAlpha": 0.3
              }
            ]
          },
          {
            attr: "x",
            warper: easelvl2,
            stops: [
              {
                frame: 577,
                "x": 420
              },
              {
                frame: 703,
                "x": 360
              }
            ]
          }
        ]
      },
      {
        type: "image",
        asset: "shinji_profile_3",
        bbw: 720,
        bbh: 480,
        x: 360,
        y: 240,
        zindex: 6,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 577,
                "globalAlpha": 0
              },
              {
                frame: 592,
                "globalAlpha": 1
              }
            ]
          },
          {
            attr: "x",
            warper: easelvl2,
            stops: [
              {
                frame: 577,
                "x": 420
              },
              {
                frame: 703,
                "x": 360
              }
            ]
          },
          {
            ctxattr: "globalCompositeOperation",
            stops:[{frame: 0, "globalCompositeOperation": "lighten"}]
          }
        ]
      }
    ],
    "629..715": [
      {
        type: "image",
        asset: "shinjisil",
        bbw: 107,
        bbh: 419,
        x: 586,
        y: 265,
        zindex: 3,
        tweens: [
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 629,
                "globalAlpha": 0
              },
              {
                frame: 637,
                "globalAlpha": 1
              },
              {
                frame: 705,
                "globalAlpha": 1
              },
              {
                frame: 715,
                "globalAlpha": 0
              }
            ]
          }
        ]
      }
    ],
    "629..708": [
      {
        type: "text",
        text: "\u52D5\u65B0\u8D77",
        font: "38px matisse2_thin, serif",
        color: "#ffffff",
        x: 400,
        y: 400,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"right"}]
          }
        ]
      },
      {
        type: "text",
        text: "\u9023 \u76F4 \u516C\n\u9023\u76F4\u56FD\u5C5E",
        font: "60px matisse2_thin, serif",
        color: "#ffffff",
        x: 440,
        y: 360,
        zindex: 10,
        newlinewidth: 86,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"left"}]
          }
        ]
      }
    ],
    "712..797": [
      {
        type: "text",
        text: "\u52D5\u65B0\u8D77\u56FD\n\t\u30D3\u7248\u306B\u95A2",
        font: "38px matisse2_thin, serif",
        color: "#ffffff",
        x: 205,
        y: 72,
        tabwidth: 220,
        newlinewidth: 370,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"right"}]
          }
        ]
      },
      {
        type: "text",
        text: "\u9023\u76F4 \u516C\n\t\u9023\u76F4\u56FD\u5C5E",
        font: "60px matisse2_thin, serif",
        color: "#ffffff",
        x: 240,
        y: 75,
        zindex: 10,
        tabwidth: 220,
        newlinewidth: 370,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"left"}]
          }
        ]
      }
    ],
    "718..867": [
      {
        type: "image",
        asset: "rei_sil",
        bbw: 295,
        bbh: 2064,
        x: 573,
        y: 1275,
        zindex: 4,
        tweens: [
          {
            attr: "y",
            stops: [
              {
                frame: 718,
                "y": 1275
              },
              {
                frame: 867,
                "y": -675
              }
            ]
          },
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 718,
                "globalAlpha": 0
              },
              {
                frame: 725,
                "globalAlpha": 1
              },
              {
                frame: 854,
                "globalAlpha": 1
              },
              {
                frame: 867,
                "globalAlpha": 0
              }
            ]
          }
        ]
      },
      {
        type: "image",
        asset: "ausna_sil",
        bbw: 295,
        bbh: 2064,
        x: 147,
        y: 1275,
        zindex: 4,
        tweens: [
          {
            attr: "y",
            stops: [
              {
                frame: 718,
                "y": -795
              },
              {
                frame: 867,
                "y": 1155
              }
            ]
          },
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 718,
                "globalAlpha": 0
              },
              {
                frame: 725,
                "globalAlpha": 1
              },
              {
                frame: 854,
                "globalAlpha": 1
              },
              {
                frame: 867,
                "globalAlpha": 0
              }
            ]
          }
        ]
      }
    ],
    "810..852": [
      {
        type: "text",
        text: "\u52D5\u65B0\u8D77\u56FD\n\n\n\n\n\t\u30D3\u7248\u306B\u95A2\n\t\u52D5\u65B0\u95A2\u8D77",
        font: "38px matisse2_thin, serif",
        color: "#ffffff",
        x: 420,
        y: 72,
        tabwidth: -210,
        newlinewidth: 60,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"right"}]
          }
        ]
      },
      {
        type: "text",
        text: "\u9023\u76F4\u30EA\u30FC\n\n\n\n\n\t\u9023\u76F4\u56FD\u5C5E\n\t\u3078\u3068\u79FB\u7BA1",
        font: "60px matisse2_thin, serif",
        color: "#ffffff",
        x: 450,
        y: 76,
        tabwidth: -210,
        newlinewidth: 60,
        zindex: 10,
        tweens: [
          {
            ctxattr: "textAlign",
            stops: [{frame:0,"textAlign":"left"}]
          }
        ]
      }
    ],
    "901..1213": [
      {
        type: "image",
        asset: "clouds2",
        x: 0,
        y: 0,
        zindex: 20,
        tweens: [
          {
            attr: "x,y",
            stops: [
              {
                frame: 901,
                "x": 0,
                "y": (-600+480)/2
              },
              {
                frame: 1213,
                "x": -2700+1020,
                "y": 0
              }
            ]
          },
          {
            ctxattr: "globalAlpha",
            stops: [
              {
                frame: 901,
                "globalAlpha": 0
              },
              {
                frame: 915,
                "globalAlpha": 1
              }
            ]
          }
        ]
      }
    ],
  };

  var rangeformat = /(\d+)\.\.(\d+)/;

  function expand_to_arry(x) {
    var range = rangeformat.exec(x);
    var a =  parseInt(range[1], 10);
    var b =  parseInt(range[2], 10);
    var retarry = [];
    for(var j = a; j <= b; j++){
      retarry = retarry.concat([x.replace(rangeformat, pad(j, range[1].length))])
    }
    return retarry;
  }

  drawframe = function(framenum) {
    var rangeformat_a = /^(\d+)$/;
    var rangeformat_b = /^(\d+)\.\.(\d+)$/;

    var contents = [];

    for(i in FRAMES){
      var inside = false;
      var level = 1;
      if(rangeformat_a.test(i)) {
        range = rangeformat_a.exec(i);
        inside = (framenum == parseInt(range[1], 10));
      }
      if(rangeformat_b.test(i)) {
        range = rangeformat_b.exec(i);
        var a =  parseInt(range[1], 10);
        var b =  parseInt(range[2], 10);
        inside = (framenum >= a && framenum <= b);
        level = (framenum - a)/(b-a);
        // console.log(a+","+b+" -> "+level);
      }

      if(inside) {
        // FRAMES[i].map(function(item){
        //   item.level = level;
        //   if(item.level_tween){
        //     item.level = item.level_tween(item.level);
        //   }
        // });
        contents = contents.concat(FRAMES[i]);
      }
    }
    contents.sort(function(a,b){
      //positive, a > b
      if((a.zindex||0) > (b.zindex||0)){
        return 1;
      } if((a.zindex||0) < (b.zindex||0)){
        return -1;
      } else {
        return 0;
      }
    });
    console.log(contents);

    //reset
    ctx.save(); 
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,720,480);
    ctx.restore(); 

    contents.map(function(content){
      ctx.save(); 
      ctx.textAlign="center"; 

      //compute values for ctxattr, attr, put them in right spot
      if(content.tweens){
      content.tweens.map(function(tween){
        var tmp = {};
        var type = "";
        var attrs = "";
        if(typeof tween.attr !== "undefined"){
          attrs = tween.attr;
          type = "attr";
        } else if (tween.ctxattr !== "undefined"){
          attrs = tween.ctxattr;
          type = "ctxattr";
        } else {
          return false;
        }
        attrs = attrs.split(",");
        //if there is no stop greater than framenum extrapolate from last stops
        stop_1 = tween.stops[tween.stops.length - 1];
        stop_2 = stop_1;
        for(var i = 0; i < tween.stops.length; i++) {
          //find first stop greater than framenum
          if(tween.stops[i].frame > framenum) {
            //if the first stop is the greatest
            stop_1 = (i === 0) ? tween.stops[i] : tween.stops[i-1];
            stop_2 = tween.stops[i];
            break;
          }
        }

        //compute how far in the transition we are
        var level = (framenum - stop_1.frame)/(stop_2.frame - stop_1.frame);
        if(tween.warper){
          level = tween.warper(level);
        }
        if(stop_2.frame - stop_1.frame == 0){
          //take into account when stop_1 = stop_2
          level = 0;
        }

        // console.log("stop_1");
        // console.log(stop_1);
        // console.log("stop_2");
        // console.log(stop_2);

        for(var i = 0; i < attrs.length; i++){
          var attr = attrs[i];
          var computed = intp(stop_1[attr], stop_2[attr], level);
          if(type === "attr"){
            content[attr] = computed;
          } else if (type == "ctxattr") {
            ctx[attr] = computed;
          }
        }

      });
      }

      if(content.type === "image"){
        var contassets = [];
        if(rangeformat.test(content.asset)){
          contassets = expand_to_arry(content.asset);
        } else {
          contassets = content.asset.split(",");
        }
        var rate = content.rate || 1;
        var offset = content.offset || 0;
        var asset_name = contassets[(Math.floor(framenum*rate) - offset)%contassets.length];
        console.log(asset_name);
        var img = ASSETS[asset_name].image;
        if(typeof content.bbw === "number"){
          if(typeof content.sbw == "number") {
            var x = content.x - (content.bbw * content.sbw)/2;
            var y = content.y - (content.bbh * content.sbh)/2;
            var dx = content.sbw * img.width;
            var dy = content.sbh * img.height;
            ctx.drawImage(img, x, y, dx, dy);
          } else {
            var x = content.x - (content.bbw)/2;
            var y = content.y - (content.bbh)/2;
            ctx.drawImage(img, x, y);
          }
        } else {
          ctx.drawImage(img, content.x, content.y);
        }
      } else if(content.type === "rect") {
        ctx.fillStyle = content.color;
        ctx.fillRect(content.x, content.y, content.x+content.w, content.y+content.h);
      } else if(content.type === "text") {
        var text = content.text;
        if(typeof text === "undefined") {
          text = TEXT_ASSETS[content.textasset];
        }
        ctx.fillStyle = content.color;
        ctx.font = content.font;
        var lines = text.split("\n");
        var tabwidth = content.tabwidth || 0;
        var newlinewidth = content.newlinewidth || 0;
        for(var k = 0; k < lines.length; k++){
          var tabs = lines[k].split("\t");
          for(var l = 0; l < tabs.length; l++){
            ctx.fillText(tabs[l], content.x + tabwidth * l, content.y  + newlinewidth*k);
          }
        }
      }
      ctx.restore(); 
    })
  }

  function EditorState(){
    this.currentframe = 0;
  };

  EditorState.prototype = {
    get currentframe(){
        return this._currentframe;
    },
    set currentframe(val){
        val = Math.max(val, 0);
        this._currentframe = val;
        drawframe(val);
        $("span#framenum").text(val);
    }
  };


  function done_loading() {
    // ctx.fillStyle = "#3A3A3A";
    // ctx.fillRect(0, 0, 720, 480);
    console.log("done like dinner");
    window.editorstate = new EditorState();
    $("button#dec_frame").click(function(){
      window.editorstate.currentframe -= 1;
    });
    $("button#dec_frame_2").click(function(){
      window.editorstate.currentframe -= 10;
    });
    $("button#dec_frame_3").click(function(){
      window.editorstate.currentframe -= 100;
    });
    $("button#inc_frame").click(function(){
      window.editorstate.currentframe += 1;
    });
    $("button#inc_frame_2").click(function(){
      window.editorstate.currentframe += 10;
    });
    $("button#inc_frame_3").click(function(){
      window.editorstate.currentframe += 100;
    });
    $("button#b_play").click(function(){
      if (window.playinterval) {
        window.clearInterval(window.playinterval);
        window.playinterval = null;
      } else {
        window.playinterval = window.setInterval(function(){
          window.editorstate.currentframe += 1;
        }, 42);
      }
    });
    $("button#b_stop").click(function(){
      window.editorstate.currentframe = 0;
      window.clearInterval(window.playinterval);
      window.playinterval = null;
    });
  }

  for(i in OLD_ASSETS) {
    if(rangeformat.test(i)) {
      var range = rangeformat.exec(i);
      var a =  parseInt(range[1], 10);
      var b =  parseInt(range[2], 10);
      for(var j = a; j <= b; j++){
        assetstring = i.replace(rangeformat, pad(j, range[1].length) );
        filestring = OLD_ASSETS[i].src.replace(/%d/, pad(j, range[1].length) );
        console.log(assetstring);
        console.log(filestring);
        ASSETS[assetstring] = {};
        ASSETS[assetstring].image = new Image();
        ASSETS[assetstring].image.src = filestring;
      }
      // delete ASSETS[i];
    } else {
      ASSETS[i] = {};
      ASSETS[i].image = new Image();
      ASSETS[i].image.src = OLD_ASSETS[i].src;
    }
  }

  console.log(ASSETS);

  var loading_interval = window.setInterval(function(){
    console.log("checked");
    var total = 0;
    var loaded = 0;
    for(i in ASSETS) {
      if(ASSETS[i].image) {
        total+=1;
        if(ASSETS[i].image.complete){
          loaded+=1;
        }
      }
    }
    $(".status").text("loading assets "+loaded+"/"+total);
    if(loaded === total){
      clearInterval(loading_interval);
      window.setTimeout(done_loading, 1);
      $(".status").text("");
    }
  }, 100);
});
