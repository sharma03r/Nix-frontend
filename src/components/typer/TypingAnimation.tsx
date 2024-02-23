import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat with Nix",
        1000,
        "Bulit using OpenAI",
        2000,
        "A customized GPT",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px black",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
