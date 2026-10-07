import "./App.css";
import Stars from "./components/Stars";
import CursorGlow from "./components/CursorGlow";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";

// ======================================================
// INITIAL AI MESSAGE
// ======================================================

const initialMessage = {
  type: "ai",
  text: "Hello, explorer. I am SPACE AI. Ask me anything about astronomy, planets, galaxies, black holes or space exploration.",
};

// ======================================================
// PLANETS
// ======================================================

const planets = [
  {
    name: "Mercury",
    subtitle: "The Swift Planet",
    distance: "57.9M km",
    temp: "167°C",
    className: "mercury",
    diameter: "4,879 km",
    moons: "0",
    year: "88 Earth days",
    description:
      "Mercury is the smallest planet in our solar system and the closest planet to the Sun. It has a heavily cratered surface and experiences extreme temperature changes.",
  },
  {
    name: "Venus",
    subtitle: "The Hottest Planet",
    distance: "108.2M km",
    temp: "464°C",
    className: "venus",
    diameter: "12,104 km",
    moons: "0",
    year: "225 Earth days",
    description:
      "Venus is the second planet from the Sun. Its thick carbon dioxide atmosphere traps heat, making it the hottest planet in the solar system.",
  },
  {
    name: "Earth",
    subtitle: "Our Home",
    distance: "149.6M km",
    temp: "15°C",
    className: "earth",
    diameter: "12,742 km",
    moons: "1",
    year: "365.25 days",
    description:
      "Earth is the third planet from the Sun and the only world currently known to support life. Around 71 percent of its surface is covered by oceans.",
  },
  {
    name: "Mars",
    subtitle: "The Red Planet",
    distance: "227.9M km",
    temp: "-63°C",
    className: "mars",
    diameter: "6,779 km",
    moons: "2",
    year: "687 Earth days",
    description:
      "Mars is a cold desert world known for its reddish surface. It is home to Olympus Mons, the largest known volcano in the solar system.",
  },
  {
    name: "Jupiter",
    subtitle: "The Giant Planet",
    distance: "778.5M km",
    temp: "-110°C",
    className: "jupiter",
    diameter: "139,820 km",
    moons: "95+",
    year: "11.86 Earth years",
    description:
      "Jupiter is the largest planet in our solar system. It is a gas giant famous for the Great Red Spot, a massive storm larger than Earth.",
  },
  {
    name: "Saturn",
    subtitle: "The Ringed Planet",
    distance: "1.43B km",
    temp: "-140°C",
    className: "saturn",
    diameter: "116,460 km",
    moons: "140+",
    year: "29.45 Earth years",
    description:
      "Saturn is a gas giant famous for its spectacular ring system, which is made mostly of water ice, rock and dust.",
  },
  {
    name: "Uranus",
    subtitle: "The Sideways Planet",
    distance: "2.87B km",
    temp: "-195°C",
    className: "uranus",
    diameter: "50,724 km",
    moons: "27+",
    year: "84 Earth years",
    description:
      "Uranus is an ice giant with a blue-green appearance caused by methane in its atmosphere. It rotates almost sideways because of its extreme axial tilt.",
  },
  {
    name: "Neptune",
    subtitle: "The Windy Planet",
    distance: "4.5B km",
    temp: "-200°C",
    className: "neptune",
    diameter: "49,244 km",
    moons: "14+",
    year: "164.8 Earth years",
    description:
      "Neptune is the farthest major planet from the Sun. It is an ice giant with incredibly powerful winds and intense storms.",
  },
];

// ======================================================
// SOLAR SYSTEM SETTINGS
// ======================================================

const solarSystemPlanets = [
  {
    planet: planets[0],
    orbitClass: "solar-orbit-1",
    planetClass: "solar-mercury",
    duration: 8,
    startAngle: 20,
  },
  {
    planet: planets[1],
    orbitClass: "solar-orbit-2",
    planetClass: "solar-venus",
    duration: 11,
    startAngle: 70,
  },
  {
    planet: planets[2],
    orbitClass: "solar-orbit-3",
    planetClass: "solar-earth",
    duration: 14,
    startAngle: 130,
  },
  {
    planet: planets[3],
    orbitClass: "solar-orbit-4",
    planetClass: "solar-mars",
    duration: 18,
    startAngle: 190,
  },
  {
    planet: planets[4],
    orbitClass: "solar-orbit-5",
    planetClass: "solar-jupiter",
    duration: 24,
    startAngle: 235,
  },
  {
    planet: planets[5],
    orbitClass: "solar-orbit-6",
    planetClass: "solar-saturn",
    duration: 30,
    startAngle: 285,
  },
  {
    planet: planets[6],
    orbitClass: "solar-orbit-7",
    planetClass: "solar-uranus",
    duration: 36,
    startAngle: 320,
  },
  {
    planet: planets[7],
    orbitClass: "solar-orbit-8",
    planetClass: "solar-neptune",
    duration: 42,
    startAngle: 355,
  },
];

// ======================================================
// MISSIONS
// ======================================================

const missions = [
  {
    name: "Apollo 11",
    year: "1969",
    agency: "NASA",
    destination: "Moon",
    crew: "3 astronauts",
    duration: "8 days",
    status: "Completed",
    description:
      "Apollo 11 was the first mission to land humans on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins remained in lunar orbit.",
  },
  {
    name: "Voyager 1",
    year: "1977",
    agency: "NASA",
    destination: "Interstellar Space",
    crew: "Uncrewed",
    duration: "Ongoing",
    status: "Active",
    description:
      "Voyager 1 explored Jupiter and Saturn before continuing outward. It later became the first human-made object to enter interstellar space.",
  },
  {
    name: "Mars Perseverance",
    year: "2020",
    agency: "NASA",
    destination: "Mars",
    crew: "Uncrewed",
    duration: "Ongoing",
    status: "Active",
    description:
      "Perseverance landed in Jezero Crater to search for signs of ancient microbial life, study Martian geology and collect samples.",
  },
  {
    name: "Chandrayaan-3",
    year: "2023",
    agency: "ISRO",
    destination: "Moon",
    crew: "Uncrewed",
    duration: "Lunar Mission",
    status: "Completed",
    description:
      "Chandrayaan-3 demonstrated a successful soft landing near the Moon's south polar region using the Vikram lander and Pragyan rover.",
  },
];

// ======================================================
// GALAXIES
// ======================================================

const galaxies = [
  {
    name: "Milky Way",
    type: "Barred Spiral Galaxy",
    distance: "Our Galaxy",
    diameter: "100,000 light-years",
    stars: "100–400 billion",
    description:
      "The Milky Way is the galaxy containing our solar system. It contains billions of stars, gas, dust and planetary systems.",
  },
  {
    name: "Andromeda",
    type: "Spiral Galaxy",
    distance: "2.5 million light-years",
    diameter: "220,000 light-years",
    stars: "About 1 trillion",
    description:
      "Andromeda is the nearest large galaxy to the Milky Way and is moving toward our galaxy.",
  },
  {
    name: "Sombrero Galaxy",
    type: "Spiral Galaxy",
    distance: "About 29 million light-years",
    diameter: "About 50,000 light-years",
    stars: "Billions",
    description:
      "The Sombrero Galaxy is famous for its bright central bulge and dark dust lane.",
  },
  {
    name: "Triangulum Galaxy",
    type: "Spiral Galaxy",
    distance: "About 2.7 million light-years",
    diameter: "About 60,000 light-years",
    stars: "Around 40 billion",
    description:
      "The Triangulum Galaxy is the third-largest member of the Local Group.",
  },
];

// ======================================================
// ORBIT PLANET
// ======================================================

function OrbitPlanet({
  item,
  paused,
  speed,
  onSelect,
}) {
  const rotation = useMotionValue(
    item.startAngle || 0
  );

  useAnimationFrame(
    (time, delta) => {
      if (paused) return;

      let speedMultiplier = 1;

      if (speed === "slow") {
        speedMultiplier = 0.55;
      }

      if (speed === "fast") {
        speedMultiplier = 1.8;
      }

      const degreesPerSecond =
        360 / item.duration;

      const movement =
        degreesPerSecond *
        speedMultiplier *
        (delta / 1000);

      rotation.set(
        (rotation.get() +
          movement) %
          360
      );
    }
  );

  return (
    <div
      className={`solar-orbit ${item.orbitClass}`}
    >
      <motion.div
        className="solar-orbit-rotator"
        style={{
          rotate: rotation,
        }}
      >
        <motion.button
          className={`solar-planet ${item.planetClass}`}
          onClick={() =>
            onSelect(item.planet)
          }
          whileHover={{
            scale: 1.6,
          }}
          whileTap={{
            scale: 0.9,
          }}
          title={
            item.planet.name
          }
        >
          <span className="solar-planet-tooltip">
            {item.planet.name}
          </span>

          {item.planet.name ===
            "Saturn" && (
            <span className="solar-saturn-ring"></span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}

// ======================================================
// APP
// ======================================================

function App() {
  // ======================================================
  // LOADING SCREEN
  // ======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadingProgress,
    setLoadingProgress,
  ] = useState(0);

  // ======================================================
  // MOBILE MENU
  // ======================================================

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  // ======================================================
  // BACKEND
  // ======================================================

  const [
    backendOnline,
    setBackendOnline,
  ] = useState(null);

  const [
    backendMode,
    setBackendMode,
  ] = useState("");

  // ======================================================
  // CHAT
  // ======================================================

  const [
    question,
    setQuestion,
  ] = useState("");

  const [
    messages,
    setMessages,
  ] = useState([
    initialMessage,
  ]);

  const [
    isTyping,
    setIsTyping,
  ] = useState(false);

  const [
    lastError,
    setLastError,
  ] = useState(null);

  const messagesEndRef =
    useRef(null);

  // ======================================================
  // MODALS
  // ======================================================

  const [
    selectedPlanet,
    setSelectedPlanet,
  ] = useState(null);

  const [
    selectedMission,
    setSelectedMission,
  ] = useState(null);

  const [
    showGalaxyExplorer,
    setShowGalaxyExplorer,
  ] = useState(false);

  const [
    selectedGalaxy,
    setSelectedGalaxy,
  ] = useState(
    galaxies[0]
  );

  const [
    showBlackHoleExperience,
    setShowBlackHoleExperience,
  ] = useState(false);

  // ======================================================
  // SPACE TRAVEL
  // ======================================================

  const [
    isWarping,
    setIsWarping,
  ] = useState(false);

  // ======================================================
  // SOLAR SYSTEM
  // ======================================================

  const [
    orbitsPaused,
    setOrbitsPaused,
  ] = useState(false);

  const [
    orbitSpeed,
    setOrbitSpeed,
  ] = useState(
    "normal"
  );

  // ======================================================
  // SCROLL
  // ======================================================

  const {
    scrollYProgress,
  } = useScroll();

  const scaleX =
    useSpring(
      scrollYProgress,
      {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
      }
    );

  // ======================================================
  // LOADER EFFECT
  // ======================================================

  useEffect(() => {
    let progress = 0;

    const interval =
      setInterval(() => {
        progress += Math.floor(
          Math.random() * 8
        ) + 2;

        if (progress >= 100) {
          progress = 100;

          setLoadingProgress(
            100
          );

          clearInterval(
            interval
          );

          setTimeout(() => {
            setLoading(
              false
            );
          }, 500);

          return;
        }

        setLoadingProgress(
          progress
        );
      }, 90);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  // ======================================================
  // BACKEND CHECK
  // ======================================================

  const checkBackend =
    async () => {
      const controller =
        new AbortController();

      const timeout =
        setTimeout(
          () =>
            controller.abort(),
          5000
        );

      try {
        const response =
          await fetch(
            "http://localhost:5000/",
            {
              signal:
                controller.signal,
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Backend unavailable"
          );
        }

        const data =
          await response.json();

        setBackendOnline(
          true
        );

        setBackendMode(
          data.mode || ""
        );
      } catch {
        setBackendOnline(
          false
        );

        setBackendMode("");
      } finally {
        clearTimeout(
          timeout
        );
      }
    };

  // ======================================================
  // CHECK BACKEND
  // ======================================================

  useEffect(() => {
    checkBackend();

    const interval =
      setInterval(
        checkBackend,
        10000
      );

    return () =>
      clearInterval(
        interval
      );
  }, []);

  // ======================================================
  // CHAT AUTO SCROLL
  // ======================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [
    messages,
    isTyping,
    lastError,
  ]);

  // ======================================================
  // MOBILE MENU SCROLL LOCK
  // ======================================================

  useEffect(() => {
    if (
      mobileMenuOpen
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    mobileMenuOpen,
  ]);

  const closeMobileMenu =
    () => {
      setMobileMenuOpen(
        false
      );
    };

  // ======================================================
  // CLEAR CHAT
  // ======================================================

  const clearChat = () => {
    if (isTyping) return;

    setMessages([
      initialMessage,
    ]);

    setQuestion("");

    setLastError(
      null
    );
  };

  // ======================================================
  // FRIENDLY ERROR
  // ======================================================

  const getFriendlyError =
    (
      status,
      data,
      error
    ) => {
      if (
        error?.name ===
        "AbortError"
      ) {
        return {
          type: "timeout",
          title:
            "Request timed out",
          message:
            "SPACE AI took too long to respond. Please try again.",
        };
      }

      if (
        status === 429 ||
        data?.code ===
          "rate_limit_exceeded" ||
        data?.code ===
          "credit_balance_exhausted"
      ) {
        return {
          type: "quota",
          title:
            "AI quota unavailable",
          message:
            "The AI service has reached its current usage or credit limit. Demo Mode can still be used if enabled on the backend.",
        };
      }

      if (
        status >= 500
      ) {
        return {
          type: "server",
          title:
            "Server error",
          message:
            data?.error ||
            "The SPACE AI server encountered an error. Please try again.",
        };
      }

      if (
        status >= 400
      ) {
        return {
          type: "request",
          title:
            "Request error",
          message:
            data?.error ||
            "SPACE AI could not process that request.",
        };
      }

      if (
        error instanceof
          SyntaxError
      ) {
        return {
          type: "invalid",
          title:
            "Invalid server response",
          message:
            "The backend returned an unexpected response.",
        };
      }

      return {
        type: "offline",
        title:
          "Connection lost",
        message:
          "SPACE AI could not reach the backend server. Make sure the server is running on port 5000.",
      };
    };

  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage =
    async (
      customQuestion
    ) => {
      const finalQuestion =
        (
          customQuestion ||
          question
        ).trim();

      if (
        !finalQuestion ||
        isTyping ||
        backendOnline !==
          true
      ) {
        return;
      }

      const userMessage = {
        type: "user",
        text:
          finalQuestion,
      };

      setMessages(
        (previous) => [
          ...previous,
          userMessage,
        ]
      );

      setQuestion("");

      setLastError(
        null
      );

      setIsTyping(
        true
      );

      const controller =
        new AbortController();

      const timeout =
        setTimeout(
          () =>
            controller.abort(),
          15000
        );

      let status = 0;
      let data = null;

      try {
        const response =
          await fetch(
            "http://localhost:5000/api/chat",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              signal:
                controller.signal,

              body:
                JSON.stringify(
                  {
                    message:
                      finalQuestion,

                    history:
                      messages
                        .slice(
                          -10
                        )
                        .map(
                          (
                            message
                          ) => ({
                            role:
                              message.type ===
                              "ai"
                                ? "assistant"
                                : "user",

                            content:
                              message.text,
                          })
                        ),
                  }
                ),
            }
          );

        status =
          response.status;

        const rawText =
          await response.text();

        if (rawText) {
          try {
            data =
              JSON.parse(
                rawText
              );
          } catch {
            throw new SyntaxError(
              "Invalid JSON"
            );
          }
        } else {
          data = {};
        }

        if (
          !response.ok
        ) {
          const friendly =
            getFriendlyError(
              status,
              data,
              null
            );

          setLastError(
            friendly
          );

          setMessages(
            (previous) => [
              ...previous,
              {
                type: "ai",
                text:
                  friendly.message,
              },
            ]
          );

          return;
        }

        if (
          !data.answer
        ) {
          const invalid =
            {
              type: "invalid",
              title:
                "Invalid response",
              message:
                "SPACE AI responded without an answer. Please try again.",
            };

          setLastError(
            invalid
          );

          setMessages(
            (previous) => [
              ...previous,
              {
                type: "ai",
                text:
                  invalid.message,
              },
            ]
          );

          return;
        }

        setBackendOnline(
          true
        );

        if (data.mode) {
          setBackendMode(
            data.mode
          );
        }

        setMessages(
          (previous) => [
            ...previous,
            {
              type: "ai",
              text:
                data.answer,
            },
          ]
        );
      } catch (error) {
        console.error(
          "SPACE AI frontend error:",
          error
        );

        const friendly =
          getFriendlyError(
            status,
            data,
            error
          );

        setLastError(
          friendly
        );

        if (
          friendly.type ===
          "offline"
        ) {
          setBackendOnline(
            false
          );
        }

        setMessages(
          (previous) => [
            ...previous,
            {
              type: "ai",
              text:
                friendly.message,
            },
          ]
        );
      } finally {
        clearTimeout(
          timeout
        );

        setIsTyping(
          false
        );
      }
    };

  // ======================================================
  // ENTER KEY
  // ======================================================

  const handleKeyDown =
    (event) => {
      if (
        event.key ===
          "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();

        sendMessage();
      }
    };

  return (
    <>
      {/* ====================================================
          LOADING SCREEN
      ==================================================== */}

      <AnimatePresence>
        {loading && (
          <motion.div
            className="space-loader"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.05,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="loader-stars loader-stars-one"></div>
            <div className="loader-stars loader-stars-two"></div>

            <motion.div
              className="loader-system"
              initial={{
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
              }}
            >
              <motion.div
                className="loader-planet"
                animate={{
                  rotate: 360,
                  scale: [
                    1,
                    1.05,
                    1,
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat:
                      Infinity,
                    ease: "linear",
                  },

                  scale: {
                    duration: 2,
                    repeat:
                      Infinity,
                    ease:
                      "easeInOut",
                  },
                }}
              >
                <div className="loader-planet-glow"></div>
              </motion.div>

              <motion.div
                className="loader-orbit"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat:
                    Infinity,
                  ease: "linear",
                }}
              >
                <div className="loader-moon"></div>
              </motion.div>
            </motion.div>

            <motion.div
              className="loader-content"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
            >
              <p>
                INITIALIZING
              </p>

              <h1>
                SPACE
                <span>
                  AI
                </span>
              </h1>

              <small>
                Preparing your journey
                through the universe
              </small>

              <div className="loader-progress-wrapper">
                <div className="loader-progress-track">
                  <motion.div
                    className="loader-progress-bar"
                    animate={{
                      width: `${loadingProgress}%`,
                    }}
                    transition={{
                      duration: 0.12,
                      ease: "linear",
                    }}
                  />
                </div>

                <div className="loader-progress-info">
                  <span>
                    SYSTEM LOADING
                  </span>

                  <strong>
                    {loadingProgress}%
                  </strong>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MAIN WEBSITE
      ==================================================== */}

      <motion.div
        className="app"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity:
            loading
              ? 0
              : 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <CursorGlow />

        <motion.div
          className="scroll-progress"
          style={{
            scaleX,
          }}
        />

        <Stars />

        {/* ==================================================
            NAVBAR
        ================================================== */}

        <motion.nav
          className="navbar"
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={
            loading
              ? {
                  y: -100,
                  opacity: 0,
                }
              : {
                  y: 0,
                  opacity: 1,
                }
          }
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <a
            href="#home"
            className="logo"
            onClick={
              closeMobileMenu
            }
          >
            SPACE
            <span>
              AI
            </span>
          </a>

          <div className="nav-links">
            <a href="#home">
              Home
            </a>

            <a href="#planets">
              Planets
            </a>

            <a href="#solar-system">
              Solar System
            </a>

            <a href="#missions">
              Missions
            </a>

            <a href="#galaxy">
              Galaxy
            </a>

            <a href="#blackhole">
              Black Hole
            </a>

            <a href="#travel">
              Travel
            </a>

            <a href="#assistant">
              AI Assistant
            </a>
          </div>

          <motion.a
            href="#planets"
            className="nav-btn"
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Explore
          </motion.a>

          <button
            className={
              mobileMenuOpen
                ? "mobile-menu-btn active"
                : "mobile-menu-btn"
            }
            onClick={() =>
              setMobileMenuOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Toggle navigation menu"
            aria-expanded={
              mobileMenuOpen
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </motion.nav>

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="mobile-menu-backdrop"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={
                  closeMobileMenu
                }
              />

              <motion.div
                className="mobile-nav-menu"
                initial={{
                  opacity: 0,
                  y: -30,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  scale: 0.96,
                }}
              >
                <div className="mobile-nav-header">
                  <div className="mobile-nav-logo">
                    SPACE
                    <span>
                      AI
                    </span>
                  </div>

                  <button
                    className="mobile-nav-close"
                    onClick={
                      closeMobileMenu
                    }
                  >
                    ×
                  </button>
                </div>

                <div className="mobile-nav-links">
                  {[
                    ["01", "Home", "#home"],
                    ["02", "Planets", "#planets"],
                    ["03", "Solar System", "#solar-system"],
                    ["04", "Missions", "#missions"],
                    ["05", "Galaxy", "#galaxy"],
                    ["06", "Black Hole", "#blackhole"],
                    ["07", "Space Travel", "#travel"],
                    ["08", "AI Assistant", "#assistant"],
                  ].map(
                    (item) => (
                      <a
                        key={
                          item[0]
                        }
                        href={
                          item[2]
                        }
                        onClick={
                          closeMobileMenu
                        }
                      >
                        <span>
                          {
                            item[0]
                          }
                        </span>

                        {
                          item[1]
                        }
                      </a>
                    )
                  )}
                </div>

                <a
                  href="#assistant"
                  className="mobile-explore-btn"
                  onClick={
                    closeMobileMenu
                  }
                >
                  Ask SPACE AI →
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ==================================================
            HERO
        ================================================== */}

        <section
          className="hero-section"
          id="home"
        >
          <motion.div
            className="hero"
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={
              loading
                ? {
                    opacity: 0,
                    x: -60,
                  }
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.25,
            }}
          >
            <p className="small-title">
              WELCOME TO
            </p>

            <h1>
              AI SPACE
              <span>
                EXPLORER
              </span>
            </h1>

            <p className="description">
              Explore planets,
              galaxies, black holes
              and the mysteries of
              the universe through an
              interactive animated
              experience.
            </p>

            <motion.a
              href="#planets"
              className="explore-btn"
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Start Exploring
            </motion.a>
          </motion.div>

          <motion.div
            className="planet-area"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={
              loading
                ? {
                    opacity: 0,
                    scale: 0.7,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.2,
              delay: 0.35,
            }}
          >
            <motion.div
              className="planet-wrapper"
              animate={{
                y: [
                  0,
                  -18,
                  0,
                ],
              }}
              transition={{
                duration: 5,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
            >
              <div className="orbit orbit-one">
                <div className="moon"></div>
              </div>

              <div className="orbit orbit-two"></div>

              <div className="planet">
                <div className="planet-light"></div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ==================================================
            PLANETS
        ================================================== */}

        <section
          className="planets-section"
          id="planets"
        >
          <motion.div
            className="section-heading"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="section-tag">
              SOLAR SYSTEM
            </p>

            <h2>
              Explore the
              <span>
                {" "}
                Planets
              </span>
            </h2>

            <p>
              Discover all eight
              planets in our solar
              system.
            </p>
          </motion.div>

          <div className="planet-grid">
            {planets.map(
              (
                planet,
                index
              ) => (
                <motion.div
                  className="planet-card"
                  key={
                    planet.name
                  }
                  initial={{
                    opacity: 0,
                    y: 70,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      0.6,
                    delay:
                      index *
                      0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -12,
                    scale:
                      1.03,
                  }}
                >
                  <div
                    className={`card-planet ${planet.className}`}
                  ></div>

                  <div className="planet-card-content">
                    <p className="planet-number">
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </p>

                    <h3>
                      {
                        planet.name
                      }
                    </h3>

                    <p className="planet-subtitle">
                      {
                        planet.subtitle
                      }
                    </p>

                    <div className="planet-data">
                      <div>
                        <span>
                          Distance
                          from Sun
                        </span>

                        <strong>
                          {
                            planet.distance
                          }
                        </strong>
                      </div>

                      <div>
                        <span>
                          Average
                          Temp
                        </span>

                        <strong>
                          {
                            planet.temp
                          }
                        </strong>
                      </div>
                    </div>

                    <button
                      className="planet-card-btn"
                      onClick={() =>
                        setSelectedPlanet(
                          planet
                        )
                      }
                    >
                      Explore Planet →
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* ==================================================
            SOLAR SYSTEM
        ================================================== */}

        <section
          className="solar-system-section"
          id="solar-system"
        >
          <motion.div
            className="section-heading"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="section-tag">
              INTERACTIVE ORBIT
            </p>

            <h2>
              Our
              <span>
                {" "}
                Solar System
              </span>
            </h2>

            <p>
              Control the planetary
              simulation, change its
              speed and click any
              planet to explore it.
            </p>
          </motion.div>

          <div className="solar-controls">
            <motion.button
              className={
                orbitsPaused
                  ? "orbit-control-btn resume"
                  : "orbit-control-btn"
              }
              onClick={() =>
                setOrbitsPaused(
                  (previous) =>
                    !previous
                )
              }
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {orbitsPaused
                ? "▶ Resume Orbits"
                : "Ⅱ Pause Orbits"}
            </motion.button>

            <div className="orbit-speed-controls">
              {[
                "slow",
                "normal",
                "fast",
              ].map(
                (speed) => (
                  <button
                    key={
                      speed
                    }
                    className={
                      orbitSpeed ===
                      speed
                        ? "speed-btn active"
                        : "speed-btn"
                    }
                    onClick={() =>
                      setOrbitSpeed(
                        speed
                      )
                    }
                  >
                    {
                      speed
                    }
                  </button>
                )
              )}
            </div>

            <span
              className={
                orbitsPaused
                  ? "orbit-status paused"
                  : "orbit-status active"
              }
            >
              <i></i>

              {orbitsPaused
                ? "ORBITS PAUSED"
                : `ORBITS ACTIVE • ${orbitSpeed.toUpperCase()}`}
            </span>
          </div>

          <motion.div
            className="solar-system-container"
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <motion.div
              className="solar-sun"
              animate={{
                scale: [
                  1,
                  1.05,
                  1,
                ],
              }}
              transition={{
                duration: 3,
                repeat:
                  Infinity,
              }}
            >
              <div className="solar-sun-core"></div>
              <div className="solar-sun-glow"></div>

              <span>
                SUN
              </span>
            </motion.div>

            {solarSystemPlanets.map(
              (item) => (
                <OrbitPlanet
                  key={
                    item.planet
                      .name
                  }
                  item={
                    item
                  }
                  paused={
                    orbitsPaused
                  }
                  speed={
                    orbitSpeed
                  }
                  onSelect={
                    setSelectedPlanet
                  }
                />
              )
            )}

            <div className="solar-system-center-label">
              <span>
                Interactive System
              </span>

              <small>
                {orbitsPaused
                  ? "Simulation paused"
                  : `Speed: ${orbitSpeed}`}
              </small>
            </div>
          </motion.div>

          <div className="solar-system-legend">
            {planets.map(
              (
                planet,
                index
              ) => (
                <button
                  key={
                    planet.name
                  }
                  onClick={() =>
                    setSelectedPlanet(
                      planet
                    )
                  }
                >
                  <span
                    className={`legend-dot ${planet.className}`}
                  ></span>

                  <span>
                    {index + 1}.{" "}
                    {planet.name}
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        {/* ==================================================
            MISSIONS
        ================================================== */}

        <section
          className="missions-section"
          id="missions"
        >
          <div className="section-heading">
            <p className="section-tag">
              HUMANITY BEYOND EARTH
            </p>

            <h2>
              Legendary
              <span>
                {" "}
                Space Missions
              </span>
            </h2>

            <p>
              Discover some of
              humanity&apos;s greatest
              journeys beyond Earth.
            </p>
          </div>

          <div className="missions-grid">
            {missions.map(
              (
                mission,
                index
              ) => (
                <motion.div
                  className="mission-card"
                  key={
                    mission.name
                  }
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.12,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                  }}
                >
                  <div className="mission-top">
                    <span>
                      {
                        mission.year
                      }
                    </span>

                    <span>
                      {
                        mission.agency
                      }
                    </span>
                  </div>

                  <div className="rocket-container">
                    <motion.div
                      className="rocket"
                      animate={{
                        y: [
                          0,
                          -15,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat:
                          Infinity,
                      }}
                    >
                      🚀
                    </motion.div>

                    <div className="rocket-glow"></div>
                  </div>

                  <h3>
                    {
                      mission.name
                    }
                  </h3>

                  <p>
                    {
                      mission.description
                    }
                  </p>

                  <button
                    className="mission-btn"
                    onClick={() =>
                      setSelectedMission(
                        mission
                      )
                    }
                  >
                    View Mission →
                  </button>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* ==================================================
            GALAXY
        ================================================== */}

        <section
          className="galaxy-section"
          id="galaxy"
        >
          <motion.div
            className="galaxy-content"
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="section-tag">
              DEEP SPACE
            </p>

            <h2>
              Explore the
              <span>
                {" "}
                Galaxy
              </span>
            </h2>

            <p className="galaxy-description">
              Travel beyond our solar
              system and discover the
              immense structures that
              fill the universe.
            </p>

            <motion.button
              className="galaxy-btn"
              onClick={() =>
                setShowGalaxyExplorer(
                  true
                )
              }
              whileHover={{
                scale: 1.06,
              }}
            >
              Enter Deep Space →
            </motion.button>
          </motion.div>

          <motion.div
            className="galaxy-visual"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="galaxy">
              <div className="galaxy-core"></div>

              <div className="galaxy-arm arm-one"></div>
              <div className="galaxy-arm arm-two"></div>
              <div className="galaxy-arm arm-three"></div>

              <div className="galaxy-star star-one"></div>
              <div className="galaxy-star star-two"></div>
              <div className="galaxy-star star-three"></div>
              <div className="galaxy-star star-four"></div>
              <div className="galaxy-star star-five"></div>
              <div className="galaxy-star star-six"></div>
            </div>
          </motion.div>
        </section>

        {/* ==================================================
            BLACK HOLE
        ================================================== */}

        <section
          className="blackhole-section"
          id="blackhole"
        >
          <div className="blackhole-visual">
            <div className="blackhole-wrapper">
              <div className="blackhole-glow"></div>

              <div className="accretion-disk disk-one"></div>
              <div className="accretion-disk disk-two"></div>
              <div className="accretion-disk disk-three"></div>

              <div className="blackhole-core"></div>

              <div className="warp-ring warp-one"></div>
              <div className="warp-ring warp-two"></div>
              <div className="warp-ring warp-three"></div>
            </div>
          </div>

          <div className="blackhole-content">
            <p className="section-tag">
              GRAVITY BEYOND IMAGINATION
            </p>

            <h2>
              Enter the
              <span>
                {" "}
                Black Hole
              </span>
            </h2>

            <p className="blackhole-description">
              Black holes are regions
              where gravity becomes so
              powerful that even light
              cannot escape.
            </p>

            <motion.button
              className="blackhole-btn"
              onClick={() =>
                setShowBlackHoleExperience(
                  true
                )
              }
              whileHover={{
                scale: 1.06,
              }}
            >
              Approach Event Horizon →
            </motion.button>
          </div>
        </section>

        {/* ==================================================
            SPACE TRAVEL
        ================================================== */}

        <section
          className="travel-section"
          id="travel"
        >
          <div className="travel-heading">
            <p className="section-tag">
              DEEP SPACE JOURNEY
            </p>

            <h2>
              Travel Through
              <span>
                {" "}
                The Unknown
              </span>
            </h2>
          </div>

          <div
            className={
              isWarping
                ? "space-tunnel warp-active"
                : "space-tunnel"
            }
          >
            <div className="warp-status">
              <span
                className={
                  isWarping
                    ? "warp-status-dot active"
                    : "warp-status-dot"
                }
              ></span>

              <p>
                {isWarping
                  ? "WARP ACTIVE"
                  : "WARP ENGINE READY"}
              </p>
            </div>

            <div className="tunnel-core"></div>

            <div className="speed-line line-one"></div>
            <div className="speed-line line-two"></div>
            <div className="speed-line line-three"></div>
            <div className="speed-line line-four"></div>
            <div className="speed-line line-five"></div>
            <div className="speed-line line-six"></div>
            <div className="speed-line line-seven"></div>
            <div className="speed-line line-eight"></div>

            <div className="asteroid asteroid-one"></div>
            <div className="asteroid asteroid-two"></div>
            <div className="asteroid asteroid-three"></div>
            <div className="asteroid asteroid-four"></div>

            <motion.div
              className="spaceship"
              animate={
                isWarping
                  ? {
                      y: [
                        0,
                        -20,
                        8,
                        -12,
                        0,
                      ],
                      x: [
                        -3,
                        4,
                        -2,
                        3,
                        0,
                      ],
                      rotate: [
                        -4,
                        4,
                        -3,
                        3,
                        -4,
                      ],
                      scale: [
                        1,
                        1.08,
                        1,
                      ],
                    }
                  : {
                      y: [
                        0,
                        -12,
                        0,
                      ],
                      rotate: [
                        -2,
                        2,
                        -2,
                      ],
                    }
              }
              transition={{
                duration:
                  isWarping
                    ? 0.7
                    : 3,
                repeat:
                  Infinity,
              }}
            >
              🚀
            </motion.div>
          </div>

          <div className="travel-controls">
            <motion.button
              className={
                isWarping
                  ? "warp-btn stop"
                  : "warp-btn"
              }
              onClick={() =>
                setIsWarping(
                  (previous) =>
                    !previous
                )
              }
              whileHover={{
                scale: 1.05,
              }}
            >
              {isWarping
                ? "Stop Journey"
                : "Start Journey"}
            </motion.button>

            <a
              href="#assistant"
              className="travel-btn"
            >
              Continue To AI Guide →
            </a>
          </div>
        </section>

        {/* ==================================================
            AI ASSISTANT
        ================================================== */}

        <section
          className="assistant-section"
          id="assistant"
        >
          <div className="assistant-info">
            <p className="section-tag">
              AI SPACE GUIDE
            </p>

            <h2>
              Ask the
              <span>
                {" "}
                Universe
              </span>
            </h2>

            <p>
              Ask questions about
              planets, stars, galaxies,
              black holes, rockets and
              space missions.
            </p>

            <div className="assistant-features">
              <div>
                <span>✦</span>
                <p>Planet Information</p>
              </div>

              <div>
                <span>✦</span>
                <p>Mission Facts</p>
              </div>

              <div>
                <span>✦</span>
                <p>Galaxy Knowledge</p>
              </div>

              <div>
                <span>✦</span>
                <p>Space Questions</p>
              </div>
            </div>
          </div>

          <motion.div
            className="assistant-box"
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="assistant-header">
              <div className="ai-orb">
                <div className="ai-orb-core"></div>
              </div>

              <div className="assistant-header-info">
                <h3>
                  SPACE AI
                </h3>

                <div className="assistant-status-row">
                  <p
                    className={
                      backendOnline ===
                      false
                        ? "backend-status offline"
                        : backendOnline ===
                          null
                        ? "backend-status checking"
                        : "backend-status online"
                    }
                  >
                    <span className="online-dot"></span>

                    {backendOnline ===
                    null
                      ? " Checking..."
                      : backendOnline
                      ? isTyping
                        ? " Thinking"
                        : " Online"
                      : " Offline"}
                  </p>

                  {backendOnline &&
                    backendMode && (
                      <span className="demo-badge">
                        {backendMode.toUpperCase()}
                      </span>
                    )}
                </div>
              </div>

              <motion.button
                className="clear-chat-btn"
                onClick={
                  clearChat
                }
                disabled={
                  isTyping ||
                  messages.length <=
                    1
                }
              >
                ↻ Clear Chat
              </motion.button>
            </div>

            {backendOnline ===
              false && (
              <div className="backend-warning">
                <div>
                  <span>
                    !
                  </span>

                  <div>
                    <strong>
                      SPACE AI is offline
                    </strong>

                    <p>
                      Start the backend
                      server on port
                      5000.
                    </p>
                  </div>
                </div>

                <button
                  onClick={
                    checkBackend
                  }
                >
                  Retry
                </button>
              </div>
            )}

            {lastError &&
              backendOnline !==
                false && (
              <div
                className={`ai-error-box ${lastError.type}`}
              >
                <div>
                  <span className="ai-error-icon">
                    !
                  </span>

                  <div>
                    <strong>
                      {
                        lastError.title
                      }
                    </strong>

                    <p>
                      {
                        lastError.message
                      }
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setLastError(
                      null
                    )
                  }
                >
                  ×
                </button>
              </div>
            )}

            <div className="chat-area">
              <div className="messages-container">
                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <motion.div
                      key={
                        index
                      }
                      className={
                        message.type ===
                        "ai"
                          ? "ai-message"
                          : "user-message"
                      }
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    >
                      {message.type ===
                        "ai" && (
                        <span>
                          AI
                        </span>
                      )}

                      <p>
                        {
                          message.text
                        }
                      </p>
                    </motion.div>
                  )
                )}

                {isTyping && (
                  <div className="ai-message typing-message">
                    <span>
                      AI
                    </span>

                    <div className="typing-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </div>
                )}

                <div
                  ref={
                    messagesEndRef
                  }
                ></div>
              </div>

              <div className="suggestion-title">
                Try asking:
              </div>

              <div className="question-suggestions">
                {[
                  "What is Jupiter?",
                  "Why does Saturn have rings?",
                  "What is a black hole?",
                  "How do rockets reach orbit?",
                ].map(
                  (item) => (
                    <button
                      key={
                        item
                      }
                      disabled={
                        isTyping ||
                        backendOnline !==
                          true
                      }
                      onClick={() =>
                        sendMessage(
                          item
                        )
                      }
                    >
                      {
                        item
                      }
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder={
                  backendOnline ===
                    null
                    ? "Connecting to SPACE AI..."
                    : backendOnline ===
                      false
                    ? "SPACE AI is offline..."
                    : isTyping
                    ? "SPACE AI is thinking..."
                    : "Ask anything about space..."
                }
                value={
                  question
                }
                onChange={(
                  event
                ) =>
                  setQuestion(
                    event.target
                      .value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                disabled={
                  isTyping ||
                  backendOnline !==
                    true
                }
              />

              <button
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  isTyping ||
                  backendOnline !==
                    true ||
                  !question.trim()
                }
              >
                {isTyping
                  ? "•••"
                  : "➤"}
              </button>
            </div>
          </motion.div>
        </section>

        {/* ==================================================
            PLANET MODAL
        ================================================== */}

        {selectedPlanet && (
          <div
            className="planet-modal-overlay"
            onClick={() =>
              setSelectedPlanet(
                null
              )
            }
          >
            <motion.div
              className="planet-modal"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >
              <button
                className="modal-close"
                onClick={() =>
                  setSelectedPlanet(
                    null
                  )
                }
              >
                ×
              </button>

              <div className="modal-planet-side">
                <motion.div
                  className={`modal-planet ${selectedPlanet.className}`}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25,
                    repeat:
                      Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="modal-info">
                <p className="section-tag">
                  PLANET PROFILE
                </p>

                <h2>
                  {
                    selectedPlanet.name
                  }
                </h2>

                <h4>
                  {
                    selectedPlanet.subtitle
                  }
                </h4>

                <p className="modal-description">
                  {
                    selectedPlanet.description
                  }
                </p>

                <div className="modal-stats">
                  <div>
                    <span>
                      Distance from Sun
                    </span>
                    <strong>
                      {
                        selectedPlanet.distance
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Average Temperature
                    </span>
                    <strong>
                      {
                        selectedPlanet.temp
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Diameter
                    </span>
                    <strong>
                      {
                        selectedPlanet.diameter
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Moons
                    </span>
                    <strong>
                      {
                        selectedPlanet.moons
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Orbital Period
                    </span>
                    <strong>
                      {
                        selectedPlanet.year
                      }
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================================================
            MISSION MODAL
        ================================================== */}

        {selectedMission && (
          <div
            className="mission-modal-overlay"
            onClick={() =>
              setSelectedMission(
                null
              )
            }
          >
            <motion.div
              className="mission-modal"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >
              <button
                className="mission-modal-close"
                onClick={() =>
                  setSelectedMission(
                    null
                  )
                }
              >
                ×
              </button>

              <div className="mission-modal-visual">
                <motion.div
                  className="mission-modal-rocket"
                  animate={{
                    y: [
                      0,
                      -18,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat:
                      Infinity,
                  }}
                >
                  🚀
                </motion.div>

                <div className="mission-modal-glow"></div>
                <div className="mission-orbit-ring"></div>
              </div>

              <div className="mission-modal-info">
                <p className="section-tag">
                  SPACE MISSION
                </p>

                <h2>
                  {
                    selectedMission.name
                  }
                </h2>

                <div className="mission-modal-meta">
                  <span>
                    {
                      selectedMission.agency
                    }
                  </span>

                  <span>
                    {
                      selectedMission.year
                    }
                  </span>
                </div>

                <p className="mission-modal-description">
                  {
                    selectedMission.description
                  }
                </p>

                <div className="mission-modal-stats">
                  <div>
                    <span>
                      Destination
                    </span>
                    <strong>
                      {
                        selectedMission.destination
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Crew
                    </span>
                    <strong>
                      {
                        selectedMission.crew
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Duration
                    </span>
                    <strong>
                      {
                        selectedMission.duration
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Status
                    </span>
                    <strong>
                      {
                        selectedMission.status
                      }
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================================================
            GALAXY MODAL
        ================================================== */}

        {showGalaxyExplorer && (
          <div
            className="galaxy-modal-overlay"
            onClick={() =>
              setShowGalaxyExplorer(
                false
              )
            }
          >
            <motion.div
              className="galaxy-modal"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >
              <button
                className="galaxy-modal-close"
                onClick={() =>
                  setShowGalaxyExplorer(
                    false
                  )
                }
              >
                ×
              </button>

              <div className="galaxy-modal-left">
                <div className="galaxy-explorer-visual">
                  <div className="explorer-galaxy">
                    <div className="explorer-galaxy-core"></div>
                    <div className="explorer-arm explorer-arm-one"></div>
                    <div className="explorer-arm explorer-arm-two"></div>
                    <div className="explorer-arm explorer-arm-three"></div>
                  </div>
                </div>

                <div className="galaxy-selector">
                  {galaxies.map(
                    (
                      galaxy
                    ) => (
                      <button
                        key={
                          galaxy.name
                        }
                        className={
                          selectedGalaxy.name ===
                          galaxy.name
                            ? "galaxy-select-btn active"
                            : "galaxy-select-btn"
                        }
                        onClick={() =>
                          setSelectedGalaxy(
                            galaxy
                          )
                        }
                      >
                        {
                          galaxy.name
                        }
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="galaxy-modal-info">
                <p className="section-tag">
                  GALAXY DATABASE
                </p>

                <h2>
                  {
                    selectedGalaxy.name
                  }
                </h2>

                <h4>
                  {
                    selectedGalaxy.type
                  }
                </h4>

                <p className="galaxy-modal-description">
                  {
                    selectedGalaxy.description
                  }
                </p>

                <div className="galaxy-modal-stats">
                  <div>
                    <span>
                      Distance
                    </span>
                    <strong>
                      {
                        selectedGalaxy.distance
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Diameter
                    </span>
                    <strong>
                      {
                        selectedGalaxy.diameter
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Stars
                    </span>
                    <strong>
                      {
                        selectedGalaxy.stars
                      }
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================================================
            BLACK HOLE MODAL
        ================================================== */}

        {showBlackHoleExperience && (
          <div
            className="blackhole-experience-overlay"
            onClick={() =>
              setShowBlackHoleExperience(
                false
              )
            }
          >
            <motion.div
              className="blackhole-experience"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >
              <button
                className="blackhole-experience-close"
                onClick={() =>
                  setShowBlackHoleExperience(
                    false
                  )
                }
              >
                ×
              </button>

              <div className="event-horizon-scene">
                <motion.div
                  className="event-blackhole-wrapper"
                  animate={{
                    scale: [
                      0.9,
                      1.05,
                      0.9,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat:
                      Infinity,
                  }}
                >
                  <div className="event-glow"></div>
                  <div className="event-disk event-disk-one"></div>
                  <div className="event-disk event-disk-two"></div>
                  <div className="event-disk event-disk-three"></div>
                  <div className="event-blackhole-core"></div>
                  <div className="gravity-ring gravity-ring-one"></div>
                  <div className="gravity-ring gravity-ring-two"></div>
                  <div className="gravity-ring gravity-ring-three"></div>
                  <div className="gravity-ring gravity-ring-four"></div>
                </motion.div>

                <motion.div
                  className="falling-spacecraft"
                  animate={{
                    x: [
                      240,
                      100,
                      25,
                      0,
                    ],
                    y: [
                      -150,
                      -70,
                      -20,
                      0,
                    ],
                    scale: [
                      1,
                      0.8,
                      0.45,
                      0.1,
                    ],
                    rotate: [
                      -35,
                      -70,
                      -160,
                      -300,
                    ],
                    opacity: [
                      1,
                      1,
                      0.8,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 7,
                    repeat:
                      Infinity,
                  }}
                >
                  🚀
                </motion.div>

                <div className="event-horizon-text">
                  <p className="section-tag">
                    EVENT HORIZON SIMULATION
                  </p>

                  <h2>
                    Beyond the
                    <span>
                      {" "}
                      Point of No Return
                    </span>
                  </h2>

                  <p>
                    Watch a spacecraft
                    approach the event
                    horizon where gravity
                    becomes extremely
                    powerful.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h2>
                SPACE
                <span>
                  AI
                </span>
              </h2>

              <p>
                Explore planets,
                galaxies, black holes
                and the mysteries of
                the universe.
              </p>
            </div>

            <div className="footer-links">
              <div>
                <h3>
                  Explore
                </h3>

                <a href="#home">
                  Home
                </a>

                <a href="#planets">
                  Planets
                </a>

                <a href="#solar-system">
                  Solar System
                </a>

                <a href="#missions">
                  Missions
                </a>
              </div>

              <div>
                <h3>
                  Universe
                </h3>

                <a href="#galaxy">
                  Galaxy
                </a>

                <a href="#blackhole">
                  Black Hole
                </a>

                <a href="#travel">
                  Space Travel
                </a>
              </div>

              <div>
                <h3>
                  AI
                </h3>

                <a href="#assistant">
                  Space Assistant
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2026 SPACEAI. Built
              for exploring the
              universe.
            </p>
          </div>
        </footer>

        <motion.a
          href="#home"
          className="back-to-top"
          whileHover={{
            scale: 1.15,
            y: -5,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          🚀
        </motion.a>
      </motion.div>
    </>
  );
}

export default App;