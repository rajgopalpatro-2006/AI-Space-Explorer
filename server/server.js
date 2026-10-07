import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const DEMO_MODE =
  String(process.env.DEMO_MODE).toLowerCase() ===
  "true";

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

const OPENAI_MODEL =
  process.env.OPENAI_MODEL ||
  "gpt-5-mini";

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
    ],
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

// ======================================================
// OPENAI CLIENT
// ======================================================

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "demo-key",
});

// ======================================================
// HEALTH ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "SPACE AI backend is running.",
    mode: DEMO_MODE
      ? "demo mode"
      : "openai mode",
    port: PORT,
  });
});

// ======================================================
// API HEALTH ROUTE
// ======================================================

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      status: "online",
      mode: DEMO_MODE
        ? "demo mode"
        : "openai mode",
      timestamp:
        new Date().toISOString(),
    });
  }
);

// ======================================================
// NORMALIZE TEXT
// ======================================================

function normalizeText(value) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase();
}

// ======================================================
// FIND MOST RECENT CONVERSATION TOPIC
// ======================================================

function getConversationContext(
  history = []
) {
  const reversed = [
    ...history,
  ].reverse();

  for (const item of reversed) {
    const text =
      normalizeText(
        item?.content
      );

    if (
      text.includes(
        "black hole"
      )
    ) {
      return "black hole";
    }

    if (
      text.includes(
        "mercury"
      )
    ) {
      return "mercury";
    }

    if (
      text.includes(
        "venus"
      )
    ) {
      return "venus";
    }

    if (
      text.includes(
        "earth"
      )
    ) {
      return "earth";
    }

    if (
      text.includes(
        "mars"
      )
    ) {
      return "mars";
    }

    if (
      text.includes(
        "jupiter"
      )
    ) {
      return "jupiter";
    }

    if (
      text.includes(
        "saturn"
      )
    ) {
      return "saturn";
    }

    if (
      text.includes(
        "uranus"
      )
    ) {
      return "uranus";
    }

    if (
      text.includes(
        "neptune"
      )
    ) {
      return "neptune";
    }

    if (
      text.includes(
        "pluto"
      )
    ) {
      return "pluto";
    }

    if (
      text.includes(
        "moon"
      )
    ) {
      return "moon";
    }

    if (
      text.includes(
        "sun"
      )
    ) {
      return "sun";
    }

    if (
      text.includes(
        "galaxy"
      ) ||
      text.includes(
        "milky way"
      )
    ) {
      return "galaxy";
    }

    if (
      text.includes(
        "rocket"
      )
    ) {
      return "rocket";
    }
  }

  return null;
}

// ======================================================
// DEMO ANSWER GENERATOR
// ======================================================

function getDemoAnswer(
  message,
  history = []
) {
  const text =
    normalizeText(message);

  const context =
    getConversationContext(
      history
    );

  // ====================================================
  // GREETINGS
  // ====================================================

  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.includes(
      "hello space ai"
    )
  ) {
    return "Hello, explorer! I’m SPACE AI. Ask me about planets, stars, galaxies, black holes, rockets or space missions.";
  }

  // ====================================================
  // MERCURY
  // ====================================================

  if (
    text.includes(
      "mercury"
    )
  ) {
    return "Mercury is the smallest planet in our solar system and the closest planet to the Sun. It completes one orbit in about 88 Earth days and has no moons.";
  }

  // ====================================================
  // VENUS
  // ====================================================

  if (
    text.includes(
      "venus"
    )
  ) {
    return "Venus is the second planet from the Sun and the hottest planet in the solar system. Its thick carbon dioxide atmosphere traps enormous amounts of heat.";
  }

  // ====================================================
  // EARTH
  // ====================================================

  if (
    text.includes(
      "earth"
    )
  ) {
    return "Earth is the third planet from the Sun and the only world currently known to support life. Liquid water covers most of its surface, and it has one natural satellite, the Moon.";
  }

  // ====================================================
  // MARS
  // ====================================================

  if (
    text.includes(
      "mars"
    )
  ) {
    return "Mars is the fourth planet from the Sun. It is called the Red Planet because iron minerals on its surface oxidize, giving the ground its reddish appearance. Mars has two small moons: Phobos and Deimos.";
  }

  // ====================================================
  // JUPITER
  // ====================================================

  if (
    text.includes(
      "jupiter"
    )
  ) {
    return "Jupiter is the largest planet in our solar system. It is a gas giant mainly made of hydrogen and helium and is famous for the Great Red Spot, a gigantic storm system.";
  }

  // ====================================================
  // SATURN
  // ====================================================

  if (
    text.includes(
      "saturn"
    )
  ) {
    return "Saturn is a gas giant best known for its spectacular rings. The rings are made mainly of countless pieces of water ice mixed with rocky material and dust.";
  }

  // ====================================================
  // URANUS
  // ====================================================

  if (
    text.includes(
      "uranus"
    )
  ) {
    return "Uranus is an ice giant with a blue-green color caused mainly by methane in its atmosphere. Its rotation axis is tilted dramatically, so the planet appears to rotate almost on its side.";
  }

  // ====================================================
  // NEPTUNE
  // ====================================================

  if (
    text.includes(
      "neptune"
    )
  ) {
    return "Neptune is the farthest major planet from the Sun. It is an ice giant known for its deep blue appearance, powerful storms and some of the fastest winds measured in the solar system.";
  }

  // ====================================================
  // PLUTO
  // ====================================================

  if (
    text.includes(
      "pluto"
    )
  ) {
    return "Pluto is a dwarf planet in the Kuiper Belt beyond Neptune. It was once classified as the ninth planet, but the International Astronomical Union classified it as a dwarf planet in 2006.";
  }

  // ====================================================
  // SUN
  // ====================================================

  if (
    text.includes(
      "sun"
    )
  ) {
    return "The Sun is the star at the center of our solar system. It contains most of the solar system’s mass and produces energy through nuclear fusion in its core.";
  }

  // ====================================================
  // MOON
  // ====================================================

  if (
    text.includes(
      "moon"
    )
  ) {
    return "The Moon is Earth’s natural satellite. Its gravity helps create ocean tides, and it takes about 27.3 days to orbit Earth relative to the stars.";
  }

  // ====================================================
  // BLACK HOLES
  // ====================================================

  if (
    text.includes(
      "black hole"
    ) ||
    text.includes(
      "event horizon"
    )
  ) {
    return "A black hole is a region of spacetime where gravity is so intense that nothing inside the event horizon can escape, including light. Many black holes form after very massive stars collapse.";
  }

  // ====================================================
  // GALAXIES
  // ====================================================

  if (
    text.includes(
      "galaxy"
    ) ||
    text.includes(
      "milky way"
    )
  ) {
    return "A galaxy is a huge gravitationally bound system containing stars, gas, dust, planets and dark matter. Our solar system is located inside the Milky Way, a barred spiral galaxy.";
  }

  if (
    text.includes(
      "andromeda"
    )
  ) {
    return "The Andromeda Galaxy is the nearest large galaxy to the Milky Way, roughly 2.5 million light-years away. It is moving toward the Milky Way and the two galaxies are expected to interact far in the future.";
  }

  // ====================================================
  // ROCKETS
  // ====================================================

  if (
    text.includes(
      "rocket"
    ) &&
    (
      text.includes(
        "orbit"
      ) ||
      text.includes(
        "reach"
      )
    )
  ) {
    return "A rocket reaches orbit by accelerating both upward and sideways. Reaching space alone is not enough; the spacecraft must gain enough horizontal velocity to keep falling around Earth instead of falling back to the surface.";
  }

  if (
    text.includes(
      "rocket"
    )
  ) {
    return "Rockets generate thrust by ejecting high-speed exhaust gases in the opposite direction of travel. This follows Newton’s third law of motion and allows rockets to operate even in the vacuum of space.";
  }

  // ====================================================
  // APOLLO 11
  // ====================================================

  if (
    text.includes(
      "apollo 11"
    )
  ) {
    return "Apollo 11 was NASA’s historic 1969 mission that first landed humans on the Moon. Neil Armstrong and Buzz Aldrin explored the lunar surface while Michael Collins remained in lunar orbit.";
  }

  // ====================================================
  // VOYAGER
  // ====================================================

  if (
    text.includes(
      "voyager"
    )
  ) {
    return "Voyager 1 launched in 1977 and explored Jupiter and Saturn before continuing toward interstellar space. It became the first human-made spacecraft to enter interstellar space.";
  }

  // ====================================================
  // PERSEVERANCE
  // ====================================================

  if (
    text.includes(
      "perseverance"
    )
  ) {
    return "NASA’s Perseverance rover landed in Mars’ Jezero Crater in 2021. Its goals include studying Martian geology, searching for signs of ancient microbial life and collecting samples.";
  }

  // ====================================================
  // CHANDRAYAAN
  // ====================================================

  if (
    text.includes(
      "chandrayaan"
    )
  ) {
    return "Chandrayaan-3 is an ISRO lunar mission that successfully achieved a soft landing near the Moon’s south polar region in 2023 using the Vikram lander and Pragyan rover.";
  }

  // ====================================================
  // SOLAR SYSTEM
  // ====================================================

  if (
    text.includes(
      "solar system"
    )
  ) {
    return "Our solar system contains the Sun, eight major planets, dwarf planets, moons, asteroids, comets and other smaller objects held together by the Sun’s gravity.";
  }

  // ====================================================
  // LIGHT YEAR
  // ====================================================

  if (
    text.includes(
      "light year"
    ) ||
    text.includes(
      "light-year"
    )
  ) {
    return "A light-year is a unit of distance, not time. It is the distance light travels through a vacuum in one year, about 9.46 trillion kilometers.";
  }

  // ====================================================
  // STAR
  // ====================================================

  if (
    text.includes(
      "what is a star"
    ) ||
    text.includes(
      "stars"
    )
  ) {
    return "A star is a massive sphere of hot plasma held together by gravity. Stars produce energy mainly through nuclear fusion in their cores.";
  }

  // ====================================================
  // SUPERNOVA
  // ====================================================

  if (
    text.includes(
      "supernova"
    )
  ) {
    return "A supernova is an extremely powerful stellar explosion. Some occur when massive stars reach the end of their lives, while others involve white dwarf stars in binary systems.";
  }

  // ====================================================
  // FOLLOW-UP QUESTIONS USING CONVERSATION CONTEXT
  // ====================================================

  if (
    text.includes(
      "how big"
    ) ||
    text.includes(
      "size"
    ) ||
    text.includes(
      "diameter"
    )
  ) {
    const sizes = {
      mercury:
        "Mercury has a diameter of about 4,879 km.",
      venus:
        "Venus has a diameter of about 12,104 km.",
      earth:
        "Earth has a diameter of about 12,742 km.",
      mars:
        "Mars has a diameter of about 6,779 km.",
      jupiter:
        "Jupiter has a diameter of about 139,820 km, making it the largest planet in the solar system.",
      saturn:
        "Saturn has a diameter of roughly 116,460 km.",
      uranus:
        "Uranus has a diameter of roughly 50,724 km.",
      neptune:
        "Neptune has a diameter of roughly 49,244 km.",
      moon:
        "Earth’s Moon has a diameter of about 3,475 km.",
      sun:
        "The Sun has a diameter of roughly 1.39 million km.",
    };

    if (
      context &&
      sizes[context]
    ) {
      return sizes[
        context
      ];
    }
  }

  if (
    text.includes(
      "how many moons"
    ) ||
    text ===
      "how many moons?"
  ) {
    const moonAnswers = {
      mercury:
        "Mercury has no natural moons.",
      venus:
        "Venus has no natural moons.",
      earth:
        "Earth has one natural moon.",
      mars:
        "Mars has two moons: Phobos and Deimos.",
      jupiter:
        "Jupiter has a large and growing catalog of known moons. The exact count can change as new moons are confirmed.",
      saturn:
        "Saturn has a very large number of known moons, and the official count can change as additional small moons are confirmed.",
      uranus:
        "Uranus has many known moons, including Titania, Oberon, Ariel, Umbriel and Miranda.",
      neptune:
        "Neptune has multiple known moons, with Triton being by far the largest.",
    };

    if (
      context &&
      moonAnswers[
        context
      ]
    ) {
      return moonAnswers[
        context
      ];
    }
  }

  if (
    text.includes(
      "temperature"
    ) ||
    text.includes(
      "how hot"
    ) ||
    text.includes(
      "how cold"
    )
  ) {
    const temperatures = {
      mercury:
        "Mercury has extreme temperatures. Daytime temperatures can become extremely hot, while nighttime temperatures can fall far below freezing because it has almost no atmosphere to retain heat.",
      venus:
        "Venus has an average surface temperature of roughly 464°C, making it the hottest planet in the solar system.",
      earth:
        "Earth’s global average surface temperature is roughly 15°C, although temperatures vary greatly by location and season.",
      mars:
        "Mars has an average surface temperature around -63°C, although local temperatures vary substantially.",
      jupiter:
        "Jupiter does not have a solid surface like Earth. Temperatures near its visible cloud tops are roughly around -110°C.",
      saturn:
        "Saturn’s upper atmosphere is extremely cold, with temperatures near the cloud tops around -140°C.",
      uranus:
        "Uranus is extremely cold, with upper-atmosphere temperatures around -195°C.",
      neptune:
        "Neptune’s upper atmosphere is extremely cold, with temperatures around -200°C.",
    };

    if (
      context &&
      temperatures[
        context
      ]
    ) {
      return temperatures[
        context
      ];
    }
  }

  // ====================================================
  // DEFAULT DEMO RESPONSE
  // ====================================================

  return "That is a great space question. I am currently running in Demo Mode, so my built-in knowledge is limited. Try asking about Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, the Moon, the Sun, black holes, galaxies, rockets, Apollo 11, Voyager 1, Perseverance or Chandrayaan-3.";
}

// ======================================================
// CHAT ROUTE
// ======================================================

app.post(
  "/api/chat",
  async (req, res) => {
    const {
      message,
      history = [],
    } = req.body || {};

    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      typeof message !==
        "string" ||
      !message.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          code:
            "invalid_message",
          error:
            "Please provide a valid message.",
        });
    }

    if (
      !Array.isArray(
        history
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          code:
            "invalid_history",
          error:
            "Conversation history must be an array.",
        });
    }

    // Keep history small.

    const cleanHistory =
      history
        .filter(
          (item) =>
            item &&
            typeof item.content ===
              "string" &&
            (
              item.role ===
                "user" ||
              item.role ===
                "assistant"
            )
        )
        .slice(-10);

    // ==================================================
    // DEMO MODE
    // ==================================================

    if (DEMO_MODE) {
      const answer =
        getDemoAnswer(
          message,
          cleanHistory
        );

      return res
        .status(200)
        .json({
          success: true,
          answer,
          mode:
            "demo mode",
        });
    }

    // ==================================================
    // OPENAI MODE
    // ==================================================

    if (
      !process.env
        .OPENAI_API_KEY
    ) {
      return res
        .status(500)
        .json({
          success: false,
          code:
            "missing_api_key",
          error:
            "OPENAI_API_KEY is not configured on the server.",
        });
    }

    try {
      const completion =
        await openai.chat.completions.create(
          {
            model:
              OPENAI_MODEL,

            messages: [
              {
                role:
                  "system",

                content:
                  "You are SPACE AI, an educational astronomy assistant inside an interactive space exploration website. Answer clearly and accurately. Focus on astronomy, planets, stars, galaxies, black holes, rockets, spacecraft and space exploration. Keep normal answers concise unless the user asks for more detail.",
              },

              ...cleanHistory,

              {
                role:
                  "user",
                content:
                  message.trim(),
              },
            ],
          }
        );

      const answer =
        completion
          .choices?.[0]
          ?.message
          ?.content
          ?.trim();

      if (!answer) {
        return res
          .status(502)
          .json({
            success: false,
            code:
              "empty_ai_response",
            error:
              "The AI service returned an empty response.",
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          answer,
          mode:
            "openai mode",
        });
    } catch (error) {
      console.error(
        "OpenAI API error:",
        error
      );

      const status =
        error?.status ||
        error?.response
          ?.status ||
        500;

      // ==================================================
      // RATE LIMIT / CREDIT ERROR
      // ==================================================

      if (
        status === 429
      ) {
        return res
          .status(429)
          .json({
            success: false,
            code:
              "rate_limit_exceeded",
            error:
              "The AI service is currently rate limited or the API account has insufficient quota.",
          });
      }

      // ==================================================
      // AUTH ERROR
      // ==================================================

      if (
        status === 401
      ) {
        return res
          .status(401)
          .json({
            success: false,
            code:
              "invalid_api_key",
            error:
              "The configured OpenAI API key is invalid.",
          });
      }

      // ==================================================
      // MODEL ERROR
      // ==================================================

      if (
        status === 404
      ) {
        return res
          .status(404)
          .json({
            success: false,
            code:
              "model_unavailable",
            error:
              "The configured AI model is not available for this API account.",
          });
      }

      return res
        .status(500)
        .json({
          success: false,
          code:
            "ai_service_error",
          error:
            "SPACE AI encountered an unexpected AI service error.",
        });
    }
  }
);

// ======================================================
// 404
// ======================================================

app.use(
  (req, res) => {
    res
      .status(404)
      .json({
        success: false,
        code:
          "route_not_found",
        error:
          "Route not found.",
      });
  }
);

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Server error:",
      error
    );

    res
      .status(500)
      .json({
        success: false,
        code:
          "server_error",
        error:
          "An unexpected server error occurred.",
      });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  () => {
    console.log(
      ""
    );

    console.log(
      "========================================"
    );

    console.log(
      "🚀 SPACE AI BACKEND RUNNING"
    );

    console.log(
      `🌐 http://localhost:${PORT}`
    );

    console.log(
      `🤖 Mode: ${
        DEMO_MODE
          ? "DEMO MODE"
          : "OPENAI MODE"
      }`
    );

    console.log(
      `🛰️ Model: ${
        DEMO_MODE
          ? "Built-in Demo Knowledge"
          : OPENAI_MODEL
      }`
    );

    console.log(
      "========================================"
    );

    console.log(
      ""
    );
  }
);