<!-- src/components/PlayBar.vue -->
  
<script setup>
// import { Button } from 'primevue/button';
// import { Slider } from 'primevue/slider';
import { computed, ref, watch } from 'vue'; // Make sure watch is imported

const props = defineProps({
  songIndex: Number,
  songCount: Number,
  currentSong: Object,
  onNext: Function,
  onPrev: Function
});

const audioRef = ref(null);
const isReady = ref(false);
const duration = ref(0);
const currentProgress = ref(0);
const buffered = ref(0);
const volume = ref(0.2);
const isPlaying = ref(false);

const formatDurationDisplay = (duration) => {
  if (typeof duration !== 'number' || isNaN(duration)) {
    return '00:00';
  }
  
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration % 60); // use % instead of subtraction for clarity

  return [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');
};

const durationDisplay = computed(() => formatDurationDisplay(duration.value));
const elapsedDisplay = computed(() => formatDurationDisplay(currentProgress.value));

watch(() => props.songIndex, () => {
  if (audioRef.value) {
    audioRef.value.pause();
    setTimeout(() => {
      audioRef.value.play();
    }, 500);
  }
});

const handleNext = () => {
  props.onNext();
};

const handlePrev = () => {
  props.onPrev();
};

const togglePlayPause = () => {
  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const handleBufferProgress = (e) => {
  const audio = e.target;
  const dur = audio.duration;
  if (dur > 0) {
    for (let i = 0; i < audio.buffered.length; i++) {
      if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
        buffered.value = audio.buffered.end(audio.buffered.length - 1 - i);
        break;
      }
    }
  }
};

const handleMuteUnmute = () => {
  if (audioRef.value) {
    audioRef.value.volume = audioRef.value.volume !== 0 ? 0 : 1;
  }
};

const handleVolumeChange = (volumeValue) => {
  if (audioRef.value) {
    audioRef.value.volume = volumeValue;
    volume.value = volumeValue;
  }
};

const onProgressChange = (e) => {
  if (audioRef.value) {
    audioRef.value.currentTime = e.target.value;
    currentProgress.value = e.target.value;
  }
};

const onCanPlay = () => {
  // Play the audio when it is ready
  if (audioRef.value) {
    audioRef.value.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }
};

const updateTime = (e) => {
  currentProgress.value = e.target.currentTime;
  handleBufferProgress(e);
};
</script>
  
  <style scoped>
  .play-bar {
    background-color: var(--surface-card); 
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1100;
    width: 100%;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  }
  .play-bar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .play-bar-left, .play-bar-right {
    display: flex;
    align-items: center;
  }
  .play-bar-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-bar-slider {
    flex: 1;
    margin: 0 10px;
  }
  .play-bar-time {
    font-size: 12px;
  }
  </style>
  

  <template>
    <div class="play-bar">

      <div class="play-bar-content">

        <!-- <AudioComponent
      url="./Mozart-Andante.mp3"
      @play="onPlay"
      @pause="onPause"/> -->

        <div class="play-bar-left">
          <Button 
            icon="pi pi-step-backward" 
            class="p-button-rounded mr-2 p-button-secondary" 
            @click="handlePrev" 
            :disabled="songIndex === 0" 
          />
          <Button 
          :icon="isPlaying ? 'pi pi-pause' : 'pi pi-play'" class="p-button-rounded p-button-primary" @click="togglePlayPause"
          />
          <Button 
            icon="pi pi-step-forward" 
            class="p-button-rounded mr-3 p-button-secondary" 
            @click="handleNext" 
            :disabled="songIndex === songCount - 1" 
          />
        </div>
  
        <div class="play-bar-center">
          <span class="play-bar-time mr-2">{{ elapsedDisplay }}</span>
          <Slider 
            v-model="currentProgress" 
            class="play-bar-slider" 
            :max="duration"
            @change="onProgressChange"
          />
          <span class="play-bar-time mr-4">{{ durationDisplay }}</span>
        </div>
  
        <div class="play-bar-right">
          <Button 
            :icon="volume === 0 ? 'pi pi-volume-off' : 'pi pi-volume-up'" 
            class="p-button-rounded mr-3 p-button-secondary" 
            @click="handleMuteUnmute" 
          />
          <Slider 
            v-model="volume" 
            class="play-bar-slider" 
            min="0" 
            max="1" 
            step="0.01" 
            @change="handleVolumeChange" 
          />
        </div>
      </div>
  
      <!-- Audio element -->
      <audio
        ref="audioRef"
        src="\public\audio\FirstSnow-Emancipator.mp3" 
        preload="metadata"
        @durationchange="onDurationChange"
        @playing="onPlaying"
        @pause="onPause"
        @ended="handleNext"
        @canplay="onCanPlay"
        @timeupdate="updateTime"
        @progress="handleBufferProgress"
        @volumechange="onVolumeChange"
        
      />
    </div>
  </template>
  
