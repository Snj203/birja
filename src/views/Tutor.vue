<template>
  <div class="tutor-system-container">
    <app-header :title="systemTitle" :version="systemVersion" />

    <div class="tutor-workflow">
      <nav class="system-modules">
        <module-button
          v-for="module in modules"
          :key="module.id"
          :active="activeModule === module.id"
          @click="switchModule(module.id)"
        >
          {{ module.name }}
          <status-badge v-if="module.notifications" :count="module.notifications" />
        </module-button>
      </nav>

      <div class="module-content">
        <student-management
          v-if="activeModule === 'students'"
          :students="students"
          @add-student="showStudentForm"
          @edit-student="editStudent"
        />

        <schedule-planner
          v-if="activeModule === 'schedule'"
          :events="scheduleEvents"
          @add-event="showEventForm"
        />

        <analytics-dashboard
          v-if="activeModule === 'analytics'"
          :metrics="performanceMetrics"
        />

        <system-settings
          v-if="activeModule === 'settings'"
          :settings="systemSettings"
          @save="saveSettings"
        />
      </div>
    </div>

    <student-form-modal
      v-if="showStudentModal"
      :student="editingStudent"
      @close="closeModals"
      @save="saveStudent"
    />

    <event-form-modal
      v-if="showEventModal"
      @close="closeModals"
      @save="saveEvent"
    />
  </div>
</template>

<script>
import AppHeader from "@/system/AppHeader.vue";
import ModuleButton from '@/components/navigation/ModuleButton.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import StudentManagement from '@/modules/students/StudentManagement.vue';
import SchedulePlanner from '@/modules/schedule/SchedulePlanner.vue';
import AnalyticsDashboard from '@/modules/analytics/AnalyticsDashboard.vue';
import SystemSettings from '@/modules/settings/SystemSettings.vue';
import StudentFormModal from '@/modules/students/StudentFormModal.vue';
import EventFormModal from '@/modules/schedule/EventFormModal.vue';

export default {
  components: {
    AppHeader,
    ModuleButton,
    StatusBadge,
    StudentManagement,
    SchedulePlanner,
    AnalyticsDashboard,
    SystemSettings,
    StudentFormModal,
    EventFormModal
  },

  data() {
    return {
      systemTitle: 'TutorPro System',
      systemVersion: '1.0.0',
      activeModule: 'students',
      showStudentModal: false,
      showEventModal: false,
      editingStudent: null,

      modules: [
        { id: 'students', name: 'Ученики', notifications: 3 },
        { id: 'schedule', name: 'Расписание', notifications: 0 },
        { id: 'analytics', name: 'Аналитика', notifications: 0 },
        { id: 'settings', name: 'Настройки', notifications: 1 }
      ],

      students: [
        { id: 1, name: 'Иванов Алексей', level: 'Intermediate', progress: 65 },
        { id: 2, name: 'Петрова Мария', level: 'Beginner', progress: 30 }
      ],

      scheduleEvents: [
        { id: 1, studentId: 1, date: '2023-05-15', time: '18:00', duration: 60 }
      ],

      performanceMetrics: {
        totalStudents: 12,
        upcomingLessons: 5,
        completionRate: 78
      },

      systemSettings: {
        notifications: true,
        theme: 'light',
        language: 'ru'
      }
    };
  },

  methods: {
    switchModule(moduleId) {
      this.activeModule = moduleId;
    },

    showStudentForm() {
      this.editingStudent = null;
      this.showStudentModal = true;
    },

    editStudent(student) {
      this.editingStudent = student;
      this.showStudentModal = true;
    },

    showEventForm() {
      this.showEventModal = true;
    },

    closeModals() {
      this.showStudentModal = false;
      this.showEventModal = false;
    },

    saveStudent(studentData) {
      if (studentData.id) {
        const index = this.students.findIndex(s => s.id === studentData.id);
        this.students.splice(index, 1, studentData);
      } else {
        studentData.id = this.students.length + 1;
        this.students.push(studentData);
      }
      this.closeModals();
    },

    saveEvent(eventData) {
      eventData.id = this.scheduleEvents.length + 1;
      this.scheduleEvents.push(eventData);
      this.closeModals();
    },

    saveSettings(settings) {
      this.systemSettings = settings;
    }
  }
};
</script>

<style scoped>
.tutor-system-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.tutor-workflow {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.system-modules {
  width: 250px;
  background: #f5f7fa;
  border-right: 1px solid #e1e4e8;
  padding: 20px 0;
}

.module-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
