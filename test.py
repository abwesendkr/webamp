from pydub import AudioSegment
from pydub.playback import play

def apply_virtualizer(audio):
    # Apply virtualizer effect to the audio
    # You can use any virtualizer effect of your choice here
    # For example, you can use the 'pan' effect to create a virtualizer effect
    audio = audio.pan(-0.5) + audio.pan(0.5)
    return audio

def play_mp3_with_virtualizer(mp3_file):
    # Load the MP3 file
    audio = AudioSegment.from_file(mp3_file, format="mp3")

    # Apply virtualizer effect
    audio_with_virtualizer = apply_virtualizer(audio)

    # Play the audio with virtualizer effect
    play(audio_with_virtualizer)

# Example usage
mp3_file = "c:\Users\LAD\Downloads\stereo-test.mp3"
play_mp3_with_virtualizer(mp3_file)