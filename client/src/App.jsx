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
// BACKEND URL
// ======================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-space-explorer.onrender.com";

// ======================================================
// INITIAL AI MESSAGE
// ======================================================

const initialMessage = {
  type: "ai",
  text:
    "Hello, explorer. I am SPACE AI. Ask me anything about astronomy, planets, galaxies, black holes or space exploration.",
};

// ======================================================
// PLANETS DATA
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
// SOLAR SYSTEM DATA
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
// ORBIT PLANET COMPONENT
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
            onSelect(
              item.planet
            )
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
            {
              item.planet
                .name
            }
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
// MAIN APP
// ======================================================

function App() {
  // ====================================================
  // LOADING
  // ====================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadingProgress,
    setLoadingProgress,
  ] = useState(0);

  // ====================================================
  // NAVIGATION
  // ====================================================

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  // ====================================================
  // BACKEND
  // ====================================================

  const [
    backendOnline,
    setBackendOnline,
  ] = useState(null);

  const [
    backendMode,
    setBackendMode,
  ] = useState("");

  // ====================================================
  // AI CHAT
  // ====================================================

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

  // ====================================================
  // MODALS
  // ====================================================

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

  // ====================================================
  // TRAVEL
  // ====================================================

  const [
    isWarping,
    setIsWarping,
  ] = useState(false);

  // ====================================================
  // SOLAR SYSTEM
  // ====================================================

  const [
    orbitsPaused,
    setOrbitsPaused,
  ] = useState(false);

  const [
    orbitSpeed,
    setOrbitSpeed,
  ] = useState("normal");

  // ====================================================
  // SCROLL PROGRESS
  // ====================================================

  const {
    scrollYProgress,
  } = useScroll();

  const scaleX =
    useSpring(
      scrollYProgress,
      {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
      }
    );

  // ====================================================
  // LOADER
  // ====================================================

  useEffect(() => {
    let progress = 0;
    let finishTimeout;

    const interval =
      setInterval(() => {
        progress +=
          Math.floor(
            Math.random() *
              8
          ) + 2;

        if (
          progress >= 100
        ) {
          progress = 100;

          setLoadingProgress(
            100
          );

          clearInterval(
            interval
          );

          finishTimeout =
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

    return () => {
      clearInterval(
        interval
      );

      if (
        finishTimeout
      ) {
        clearTimeout(
          finishTimeout
        );
      }
    };
  }, []);

  // ====================================================
  // MOBILE MENU BODY LOCK
  // ====================================================

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

  // ====================================================
  // AUTO SCROLL CHAT
  // ====================================================

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
  ]);

  // ====================================================
  // BACKEND CHECK
  // ====================================================

  const checkBackend =
    async () => {
      const controller =
        new AbortController();

      const timeout =
        setTimeout(
          () =>
            controller.abort(),
          10000
        );

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/`,
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

        setBackendMode(
          ""
        );
      } finally {
        clearTimeout(
          timeout
        );
      }
    };

  useEffect(() => {
    if (loading) return;

    checkBackend();

    const interval =
      setInterval(
        checkBackend,
        30000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [loading]);

  // ====================================================
  // FRIENDLY ERRORS
  // ====================================================

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
          "SPACE AI could not reach the backend server. Please try again.",
      };
    };

  // ====================================================
  // SEND AI MESSAGE
  // ====================================================

  const sendMessage =
    async () => {
      const cleanQuestion =
        question.trim();

      if (
        !cleanQuestion ||
        isTyping ||
        backendOnline ===
          false
      ) {
        return;
      }

      const userMessage = {
        type: "user",
        text: cleanQuestion,
      };

      setMessages(
        (prev) => [
          ...prev,
          userMessage,
        ]
      );

      setQuestion("");
      setLastError(null);
      setIsTyping(true);

      const controller =
        new AbortController();

      const timeout =
        setTimeout(
          () =>
            controller.abort(),
          20000
        );

      let status = 0;
      let data = null;

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/chat`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    message:
                      cleanQuestion,

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

              signal:
                controller.signal,
            }
          );

        status =
          response.status;

        const rawText =
          await response.text();

        try {
          data = rawText
            ? JSON.parse(
                rawText
              )
            : {};
        } catch {
          throw new SyntaxError(
            "Invalid JSON"
          );
        }

        if (
          !response.ok
        ) {
          const requestError =
            new Error(
              data?.error ||
                "Request failed"
            );

          requestError.status =
            response.status;

          throw requestError;
        }

        if (
          !data?.answer
        ) {
          throw new SyntaxError(
            "Missing answer"
          );
        }

        setMessages(
          (prev) => [
            ...prev,
            {
              type: "ai",
              text:
                data.answer,
            },
          ]
        );

        setBackendOnline(
          true
        );

        if (
          data.mode
        ) {
          setBackendMode(
            data.mode
          );
        }
      } catch (error) {
        const friendlyError =
          getFriendlyError(
            status ||
              error?.status ||
              0,
            data,
            error
          );

        setLastError(
          friendlyError
        );

        if (
          friendlyError.type ===
          "offline" ||
          friendlyError.type ===
          "timeout"
        ) {
          checkBackend();
        }
      } finally {
        clearTimeout(
          timeout
        );

        setIsTyping(
          false
        );
      }
    };

  // ====================================================
  // ENTER KEY
  // ====================================================

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

  // ====================================================
  // CLEAR CHAT
  // ====================================================

  const clearChat = () => {
    setMessages([
      initialMessage,
    ]);

    setLastError(null);
    setQuestion("");
  };

  // ====================================================
  // SMOOTH SECTION SCROLL
  // ====================================================

  const scrollToSection =
    (id) => {
      const element =
        document.getElementById(
          id
        );

      if (element) {
        element.scrollIntoView(
          {
            behavior:
              "smooth",
          }
        );
      }

      setMobileMenuOpen(
        false
      );
    };

  // ====================================================
  // BACK TO TOP
  // ====================================================

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* ================================================ */}
      {/* LOADING SCREEN */}
      {/* ================================================ */}

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
              animate={{
                y: [
                  -4,
                  4,
                  -4,
                ],
              }}
              transition={{
                duration: 3,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
            >
              <motion.div
                className="loader-planet"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat:
                    Infinity,
                  ease:
                    "linear",
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
                  ease:
                    "linear",
                }}
              >
                <div className="loader-moon"></div>
              </motion.div>
            </motion.div>

            <motion.div
              className="loader-content"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <p>
                INITIALIZING
              </p>

              <h1>
                SPACE
                <span>AI</span>
              </h1>

              <small>
                Preparing your
                journey through
                the universe
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
                      ease:
                        "linear",
                    }}
                  />
                </div>

                <div className="loader-progress-info">
                  <span>
                    SYSTEM
                    LOADING
                  </span>

                  <strong>
                    {
                      loadingProgress
                    }
                    %
                  </strong>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================ */}
      {/* MAIN APPLICATION */}
      {/* ================================================ */}

      <motion.div
        className="app"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: loading
            ? 0
            : 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Stars />
        <CursorGlow />

        {/* Scroll Progress */}

        <motion.div
          className="scroll-progress"
          style={{
            scaleX,
          }}
        />

        {/* ============================================== */}
        {/* NAVBAR */}
        {/* ============================================== */}

        <nav className="navbar">
          <button
            className="nav-logo"
            onClick={
              backToTop
            }
          >
            SPACE
            <span>AI</span>
          </button>

          <div className="nav-links">
            <button
              onClick={() =>
                scrollToSection(
                  "home"
                )
              }
            >
              Home
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "planets"
                )
              }
            >
              Planets
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "solar-system"
                )
              }
            >
              Solar System
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "missions"
                )
              }
            >
              Missions
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "galaxies"
                )
              }
            >
              Galaxies
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "ai"
                )
              }
            >
              SPACE AI
            </button>
          </div>

          <button
            className="explore-btn"
            onClick={() =>
              scrollToSection(
                "planets"
              )
            }
          >
            Explore
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileMenuOpen(
                true
              )
            }
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>

        {/* ============================================== */}
        {/* MOBILE NAV */}
        {/* ============================================== */}

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
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <motion.div
                className="mobile-nav-menu"
                initial={{
                  x: "100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  type:
                    "spring",
                  stiffness: 220,
                  damping: 25,
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
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                  >
                    ×
                  </button>
                </div>

                <div className="mobile-nav-links">
                  <button
                    onClick={() =>
                      scrollToSection(
                        "home"
                      )
                    }
                  >
                    Home
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "planets"
                      )
                    }
                  >
                    Planets
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "solar-system"
                      )
                    }
                  >
                    Solar System
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "missions"
                      )
                    }
                  >
                    Missions
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "galaxies"
                      )
                    }
                  >
                    Galaxies
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "black-hole"
                      )
                    }
                  >
                    Black Hole
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "travel"
                      )
                    }
                  >
                    Space Travel
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection(
                        "ai"
                      )
                    }
                  >
                    SPACE AI
                  </button>
                </div>

                <button
                  className="mobile-explore-btn"
                  onClick={() =>
                    scrollToSection(
                      "planets"
                    )
                  }
                >
                  Begin Exploration
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ============================================== */}
        {/* HERO */}
        {/* ============================================== */}

        <section
          className="hero"
          id="home"
        >
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

          <motion.div
            className="hero-content"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            <motion.p
              className="hero-tag"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
            >
              EXPLORE BEYOND
              EARTH
            </motion.p>

            <h1>
              DISCOVER THE
              <br />
              <span>
                UNIVERSE
              </span>
            </h1>

            <p className="hero-description">
              Journey across
              planets, galaxies,
              black holes and
              legendary space
              missions through an
              immersive interactive
              experience.
            </p>

            <div className="hero-actions">
              <motion.button
                className="primary-btn"
                onClick={() =>
                  scrollToSection(
                    "planets"
                  )
                }
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Start Exploring
              </motion.button>

              <motion.button
                className="secondary-btn"
                onClick={() =>
                  scrollToSection(
                    "ai"
                  )
                }
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Ask SPACE AI
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="hero-planet"
            animate={{
              y: [
                -10,
                10,
                -10,
              ],
              rotate: [
                0,
                4,
                0,
              ],
            }}
            transition={{
              duration: 7,
              repeat:
                Infinity,
              ease:
                "easeInOut",
            }}
          >
            <div className="hero-planet-ring"></div>
          </motion.div>
        </section>

        {/* ============================================== */}
        {/* PLANETS */}
        {/* ============================================== */}

        <section
          className="section planets-section"
          id="planets"
        >
          <div className="section-heading">
            <p>
              CELESTIAL WORLDS
            </p>

            <h2>
              Explore the
              Planets
            </h2>

            <span>
              Discover the eight
              incredible worlds
              orbiting our Sun.
            </span>
          </div>

          <div className="planet-grid">
            {planets.map(
              (
                planet,
                index
              ) => (
                <motion.button
                  key={
                    planet.name
                  }
                  className="planet-card"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index *
                      0.06,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  onClick={() =>
                    setSelectedPlanet(
                      planet
                    )
                  }
                >
                  <div
                    className={`card-planet ${planet.className}`}
                  ></div>

                  <h3>
                    {
                      planet.name
                    }
                  </h3>

                  <p>
                    {
                      planet.subtitle
                    }
                  </p>

                  <div className="planet-card-stats">
                    <span>
                      {
                        planet.distance
                      }
                    </span>

                    <span>
                      {
                        planet.temp
                      }
                    </span>
                  </div>
                </motion.button>
              )
            )}
          </div>
        </section>

        {/* ============================================== */}
        {/* SOLAR SYSTEM */}
        {/* ============================================== */}

        <section
          className="section solar-section"
          id="solar-system"
        >
          <div className="section-heading">
            <p>
              ORBITAL SIMULATION
            </p>

            <h2>
              Interactive Solar
              System
            </h2>

            <span>
              Control the motion
              of the planets and
              click any world to
              explore it.
            </span>
          </div>

          <div className="solar-controls">
            <button
              className="solar-pause-btn"
              onClick={() =>
                setOrbitsPaused(
                  (prev) =>
                    !prev
                )
              }
            >
              {orbitsPaused
                ? "▶ Resume"
                : "⏸ Pause"}
            </button>

            <div className="orbit-speed-controls">
              <button
                className={`speed-btn ${
                  orbitSpeed ===
                  "slow"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOrbitSpeed(
                    "slow"
                  )
                }
              >
                Slow
              </button>

              <button
                className={`speed-btn ${
                  orbitSpeed ===
                  "normal"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOrbitSpeed(
                    "normal"
                  )
                }
              >
                Normal
              </button>

              <button
                className={`speed-btn ${
                  orbitSpeed ===
                  "fast"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOrbitSpeed(
                    "fast"
                  )
                }
              >
                Fast
              </button>
            </div>
          </div>

          <div className="solar-system-container">
            <motion.button
              className="solar-sun"
              whileHover={{
                scale: 1.08,
              }}
              onClick={() =>
                scrollToSection(
                  "ai"
                )
              }
              title="The Sun"
            >
              <span></span>
            </motion.button>

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
          </div>
        </section>

        {/* ============================================== */}
        {/* MISSIONS */}
        {/* ============================================== */}

        <section
          className="section missions-section"
          id="missions"
        >
          <div className="section-heading">
            <p>
              HUMAN DISCOVERY
            </p>

            <h2>
              Legendary Space
              Missions
            </h2>

            <span>
              Explore missions
              that changed our
              understanding of
              the universe.
            </span>
          </div>

          <div className="missions-grid">
            {missions.map(
              (
                mission,
                index
              ) => (
                <motion.button
                  className="mission-card"
                  key={
                    mission.name
                  }
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index *
                      0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  onClick={() =>
                    setSelectedMission(
                      mission
                    )
                  }
                >
                  <div className="mission-number">
                    0
                    {index +
                      1}
                  </div>

                  <p>
                    {
                      mission.agency
                    }{" "}
                    •{" "}
                    {
                      mission.year
                    }
                  </p>

                  <h3>
                    {
                      mission.name
                    }
                  </h3>

                  <span>
                    Destination:{" "}
                    {
                      mission.destination
                    }
                  </span>
                </motion.button>
              )
            )}
          </div>
        </section>

        {/* ============================================== */}
        {/* GALAXY */}
        {/* ============================================== */}

        <section
          className="section galaxy-section"
          id="galaxies"
        >
          <div className="galaxy-content">
            <div>
              <p className="eyebrow">
                BEYOND THE MILKY
                WAY
              </p>

              <h2>
                Explore Distant
                Galaxies
              </h2>

              <p>
                Travel millions
                of light-years
                beyond our solar
                system and
                discover enormous
                stellar cities
                scattered across
                the universe.
              </p>

              <motion.button
                className="primary-btn"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() =>
                  setShowGalaxyExplorer(
                    true
                  )
                }
              >
                Open Galaxy
                Explorer
              </motion.button>
            </div>

            <motion.div
              className="galaxy-visual"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 80,
                repeat:
                  Infinity,
                ease:
                  "linear",
              }}
            >
              <div className="galaxy-core"></div>
            </motion.div>
          </div>
        </section>

        {/* ============================================== */}
        {/* BLACK HOLE */}
        {/* ============================================== */}

        <section
          className="section black-hole-section"
          id="black-hole"
        >
          <div className="black-hole-visual">
            <div className="black-hole-glow"></div>
            <div className="black-hole-disk"></div>
            <div className="black-hole-center"></div>
            <div className="gravity-ring gravity-ring-one"></div>
            <div className="gravity-ring gravity-ring-two"></div>
          </div>

          <div className="black-hole-content">
            <p className="eyebrow">
              INTO THE UNKNOWN
            </p>

            <h2>
              Experience a
              Black Hole
            </h2>

            <p>
              Approach one of
              the universe's
              most mysterious
              objects and
              experience an
              animated journey
              toward the event
              horizon.
            </p>

            <motion.button
              className="primary-btn"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                setShowBlackHoleExperience(
                  true
                )
              }
            >
              Enter Experience
            </motion.button>
          </div>
        </section>

        {/* ============================================== */}
        {/* SPACE TRAVEL */}
        {/* ============================================== */}

        <section
          className={`section travel-section ${
            isWarping
              ? "warping"
              : ""
          }`}
          id="travel"
        >
          <div className="travel-stars"></div>

          <div className="asteroid asteroid-one"></div>
          <div className="asteroid asteroid-two"></div>
          <div className="asteroid asteroid-three"></div>
          <div className="asteroid asteroid-four"></div>
          <div className="asteroid asteroid-five"></div>
          <div className="asteroid asteroid-six"></div>

          {isWarping && (
            <motion.div
              className="warp-flash"
              animate={{
                opacity: [
                  0,
                  0.7,
                  0,
                ],

                scale: [
                  0.5,
                  1.5,
                  2,
                ],
              }}
              transition={{
                duration: 1.2,
                repeat:
                  Infinity,
              }}
            />
          )}

          <div className="travel-content">
            <p className="eyebrow">
              INTERSTELLAR
              JOURNEY
            </p>

            <h2>
              Travel Through
              Space
            </h2>

            <p>
              Activate the warp
              engine and begin a
              visual journey
              through deep
              space.
            </p>

            <motion.button
              className="primary-btn"
              onClick={() =>
                setIsWarping(
                  (prev) =>
                    !prev
                )
              }
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {isWarping
                ? "Stop Journey"
                : "Start Journey"}
            </motion.button>
          </div>

          <motion.div
            className="spaceship"
            animate={
              isWarping
                ? {
                    x: [
                      -20,
                      25,
                      -10,
                      35,
                      0,
                    ],
                    y: [
                      0,
                      -10,
                      8,
                      -5,
                      0,
                    ],
                    rotate: [
                      -45,
                      -42,
                      -47,
                      -43,
                      -45,
                    ],
                  }
                : {
                    y: [
                      -6,
                      6,
                      -6,
                    ],
                  }
            }
            transition={
              isWarping
                ? {
                    duration: 2,
                    repeat:
                      Infinity,
                  }
                : {
                    duration: 3,
                    repeat:
                      Infinity,
                    ease:
                      "easeInOut",
                  }
            }
          >
            <div className="spaceship-body"></div>
            <div className="spaceship-window"></div>
            <div className="spaceship-flame"></div>
          </motion.div>
        </section>

        {/* ============================================== */}
        {/* SPACE AI */}
        {/* ============================================== */}

        <section
          className="section ai-section"
          id="ai"
        >
          <div className="section-heading">
            <p>
              INTELLIGENT
              EXPLORATION
            </p>

            <h2>
              Ask SPACE AI
            </h2>

            <span>
              Ask questions about
              planets, stars,
              galaxies, black
              holes and space
              exploration.
            </span>
          </div>

          <div className="assistant-container">
            <div className="assistant-header">
              <div className="assistant-orb">
                AI
              </div>

              <div className="assistant-header-info">
                <h3>
                  SPACE AI
                </h3>

                <div
                  className={`backend-status ${
                    backendOnline ===
                    true
                      ? "online"
                      : backendOnline ===
                        false
                      ? "offline"
                      : "checking"
                  }`}
                >
                  <span></span>

                  {backendOnline ===
                  true
                    ? `Online${
                        backendMode
                          ? ` • ${backendMode.toUpperCase()}`
                          : ""
                      }`
                    : backendOnline ===
                      false
                    ? "Offline"
                    : "Checking..."}
                </div>
              </div>

              <button
                className="clear-chat-btn"
                onClick={
                  clearChat
                }
                disabled={
                  isTyping
                }
              >
                Clear Chat
              </button>
            </div>

            {backendOnline ===
              false && (
              <div className="backend-warning">
                <div>
                  <strong>
                    SPACE AI is
                    offline
                  </strong>

                  <p>
                    The backend
                    could not be
                    reached.
                  </p>
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

            <div className="messages-container">
              {messages.map(
                (
                  message,
                  index
                ) => (
                  <motion.div
                    key={`${message.type}-${index}`}
                    className={`message ${message.type}`}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    {message.type ===
                      "ai" && (
                      <span className="message-avatar">
                        AI
                      </span>
                    )}

                    <div className="message-bubble">
                      {
                        message.text
                      }
                    </div>
                  </motion.div>
                )
              )}

              {isTyping && (
                <motion.div
                  className="message ai"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  <span className="message-avatar">
                    AI
                  </span>

                  <div className="message-bubble typing-bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              <div
                ref={
                  messagesEndRef
                }
              ></div>
            </div>

            <AnimatePresence>
              {lastError && (
                <motion.div
                  className={`ai-error-box ${lastError.type}`}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  <div className="ai-error-icon">
                    !
                  </div>

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

                  <button
                    onClick={() =>
                      setLastError(
                        null
                      )
                    }
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="assistant-input-wrapper">
              <textarea
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
                placeholder={
                  backendOnline ===
                  false
                    ? "SPACE AI is currently offline..."
                    : "Ask SPACE AI about the universe..."
                }
                disabled={
                  isTyping ||
                  backendOnline ===
                    false
                }
                rows="1"
              />

              <motion.button
                onClick={
                  sendMessage
                }
                disabled={
                  !question.trim() ||
                  isTyping ||
                  backendOnline ===
                    false
                }
                whileHover={
                  question.trim() &&
                  !isTyping &&
                  backendOnline !==
                    false
                    ? {
                        scale: 1.06,
                      }
                    : {}
                }
                whileTap={{
                  scale: 0.95,
                }}
              >
                {isTyping
                  ? "..."
                  : "Send"}
              </motion.button>
            </div>

            <div className="quick-questions">
              {[
                "What is a black hole?",
                "Tell me about Jupiter",
                "How do rockets reach orbit?",
              ].map(
                (
                  item
                ) => (
                  <button
                    key={
                      item
                    }
                    onClick={() =>
                      setQuestion(
                        item
                      )
                    }
                    disabled={
                      isTyping ||
                      backendOnline ===
                        false
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
        </section>

        {/* ============================================== */}
        {/* FOOTER */}
        {/* ============================================== */}

        <footer className="footer">
          <div>
            <h2>
              SPACE
              <span>AI</span>
            </h2>

            <p>
              Explore. Learn.
              Discover the
              Universe.
            </p>
          </div>

          <div className="footer-links">
            <button
              onClick={() =>
                scrollToSection(
                  "planets"
                )
              }
            >
              Planets
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "missions"
                )
              }
            >
              Missions
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "galaxies"
                )
              }
            >
              Galaxies
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  "ai"
                )
              }
            >
              SPACE AI
            </button>
          </div>

          <p className="footer-copy">
            © 2026 AI Space
            Explorer
          </p>
        </footer>

        {/* ============================================== */}
        {/* BACK TO TOP */}
        {/* ============================================== */}

        <motion.button
          className="back-to-top"
          onClick={
            backToTop
          }
          whileHover={{
            scale: 1.12,
            y: -3,
          }}
          whileTap={{
            scale: 0.9,
          }}
          title="Back to top"
        >
          🚀
        </motion.button>

        {/* ============================================== */}
        {/* PLANET MODAL */}
        {/* ============================================== */}

        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              className="modal-backdrop"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setSelectedPlanet(
                  null
                )
              }
            >
              <motion.div
                className="space-modal"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
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

                <motion.div
                  className={`modal-planet ${selectedPlanet.className}`}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25,
                    repeat:
                      Infinity,
                    ease:
                      "linear",
                  }}
                ></motion.div>

                <p className="eyebrow">
                  PLANET PROFILE
                </p>

                <h2>
                  {
                    selectedPlanet.name
                  }
                </h2>

                <p className="modal-description">
                  {
                    selectedPlanet.description
                  }
                </p>

                <div className="modal-stats">
                  <div>
                    <span>
                      Distance
                    </span>

                    <strong>
                      {
                        selectedPlanet.distance
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Temperature
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
                      Orbital
                      Period
                    </span>

                    <strong>
                      {
                        selectedPlanet.year
                      }
                    </strong>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================== */}
        {/* MISSION MODAL */}
        {/* ============================================== */}

        <AnimatePresence>
          {selectedMission && (
            <motion.div
              className="modal-backdrop"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setSelectedMission(
                  null
                )
              }
            >
              <motion.div
                className="space-modal mission-modal"
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
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
                    setSelectedMission(
                      null
                    )
                  }
                >
                  ×
                </button>

                <div className="mission-modal-icon">
                  🚀
                </div>

                <p className="eyebrow">
                  {
                    selectedMission.agency
                  }{" "}
                  •{" "}
                  {
                    selectedMission.year
                  }
                </p>

                <h2>
                  {
                    selectedMission.name
                  }
                </h2>

                <p className="modal-description">
                  {
                    selectedMission.description
                  }
                </p>

                <div className="modal-stats">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================== */}
        {/* GALAXY EXPLORER MODAL */}
        {/* ============================================== */}

        <AnimatePresence>
          {showGalaxyExplorer && (
            <motion.div
              className="modal-backdrop"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setShowGalaxyExplorer(
                  false
                )
              }
            >
              <motion.div
                className="space-modal galaxy-modal"
                initial={{
                  opacity: 0,
                  scale: 0.88,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
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
                    setShowGalaxyExplorer(
                      false
                    )
                  }
                >
                  ×
                </button>

                <motion.div
                  className="modal-galaxy-visual"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 40,
                    repeat:
                      Infinity,
                    ease:
                      "linear",
                  }}
                >
                  <div className="modal-galaxy-core"></div>
                </motion.div>

                <p className="eyebrow">
                  GALAXY EXPLORER
                </p>

                <h2>
                  {
                    selectedGalaxy.name
                  }
                </h2>

                <p className="modal-description">
                  {
                    selectedGalaxy.description
                  }
                </p>

                <div className="modal-stats">
                  <div>
                    <span>
                      Type
                    </span>

                    <strong>
                      {
                        selectedGalaxy.type
                      }
                    </strong>
                  </div>

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
                            ? "active"
                            : ""
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================== */}
        {/* BLACK HOLE EXPERIENCE MODAL */}
        {/* ============================================== */}

        <AnimatePresence>
          {showBlackHoleExperience && (
            <motion.div
              className="modal-backdrop black-hole-modal-backdrop"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setShowBlackHoleExperience(
                  false
                )
              }
            >
              <motion.div
                className="black-hole-experience"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
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
                    setShowBlackHoleExperience(
                      false
                    )
                  }
                >
                  ×
                </button>

                <div className="event-stars"></div>

                <div className="experience-black-hole">
                  <motion.div
                    className="experience-disk"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat:
                        Infinity,
                      ease:
                        "linear",
                    }}
                  ></motion.div>

                  <div className="experience-event-horizon"></div>
                </div>

                <motion.div
                  className="falling-spacecraft"
                  animate={{
                    x: [
                      0,
                      40,
                      70,
                      100,
                    ],

                    y: [
                      0,
                      30,
                      70,
                      120,
                    ],

                    rotate: [
                      0,
                      80,
                      180,
                      300,
                    ],

                    scale: [
                      1,
                      0.9,
                      0.7,
                      0.2,
                    ],

                    opacity: [
                      1,
                      1,
                      0.7,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat:
                      Infinity,
                    ease:
                      "easeIn",
                  }}
                >
                  🚀
                </motion.div>

                <div className="black-hole-experience-text">
                  <p className="eyebrow">
                    EVENT HORIZON
                    SIMULATION
                  </p>

                  <h2>
                    Approaching
                    the Unknown
                  </h2>

                  <p>
                    Beyond the
                    event horizon,
                    escape would
                    require
                    traveling
                    faster than
                    light.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default App;