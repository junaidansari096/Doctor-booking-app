import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { dummySlots } from '../../data/dummyData';

const SlotPickerScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  // Generate next 7 days dynamically
  const dateChips = useMemo(() => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = days[nextDate.getDay()];
      const dateNum = nextDate.getDate();
      const monthName = nextDate.toLocaleString('default', { month: 'short' });
      dates.push({
        id: i.toString(),
        dayLabel: dayName,
        dateLabel: dateNum.toString(),
        monthLabel: monthName,
        fullDateString: `${dayName} ${dateNum} ${monthName}`,
        dateObject: nextDate,
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dateChips[0]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const getInitials = (name) => {
    if (!name) return 'DR';
    return name
      .replace('Dr. ', '')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSlotPress = (slot) => {
    if (slot.booked) return;
    setSelectedSlotId(slot.id === selectedSlotId ? null : slot.id);
  };

  const selectedSlot = useMemo(() => {
    return dummySlots.find((s) => s.id === selectedSlotId);
  }, [selectedSlotId]);

  const handleConfirm = () => {
    if (!selectedSlot) return;
    navigation.navigate('BookingSummary', {
      doctor,
      selectedDate: selectedDate.fullDateString,
      selectedSlot,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Doctor Summary Header */}
        <View style={styles.doctorHeaderCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(doctor.name)}</Text>
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSub}>{doctor.speciality} • {doctor.hospital}</Text>
          </View>
        </View>

        {/* Date Selector Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
          >
            {dateChips.map((chip) => {
              const isSelected = selectedDate.id === chip.id;
              return (
                <TouchableOpacity
                  key={chip.id}
                  style={[
                    styles.dateChip,
                    isSelected && styles.selectedDateChip,
                  ]}
                  onPress={() => setSelectedDate(chip)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dateChipDay,
                      isSelected && styles.selectedDateChipText,
                    ]}
                  >
                    {chip.dayLabel}
                  </Text>
                  <Text
                    style={[
                      styles.dateChipDate,
                      isSelected && styles.selectedDateChipText,
                    ]}
                  >
                    {chip.dateLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Slot Grid Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Time Slot</Text>
          <View style={styles.gridContainer}>
            {dummySlots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isBooked = slot.booked;

              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.slotChip,
                    isSelected && styles.selectedSlotChip,
                    isBooked && styles.bookedSlotChip,
                  ]}
                  onPress={() => handleSlotPress(slot)}
                  disabled={isBooked}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.slotText,
                      isSelected && styles.selectedSlotText,
                      isBooked && styles.bookedSlotText,
                    ]}
                  >
                    {slot.time}
                  </Text>
                  {isBooked && <Text style={styles.bookedLabel}>Booked</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer / Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedSlotId && styles.disabledButton,
          ]}
          onPress={handleConfirm}
          disabled={!selectedSlotId}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Slot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  doctorHeaderCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  doctorDetails: {
    marginLeft: 12,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  doctorSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  dateScroll: {
    paddingRight: 16,
  },
  dateChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 65,
    height: 70,
  },
  selectedDateChip: {
    backgroundColor: '#2c6fad',
    borderColor: '#1d4ed8',
  },
  dateChipDay: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  dateChipDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  selectedDateChipText: {
    color: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingVertical: 14,
    width: '31%', // Exactly 3 columns with gap spacing
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  selectedSlotChip: {
    backgroundColor: '#2c6fad',
    borderColor: '#1d4ed8',
  },
  bookedSlotChip: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  slotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  selectedSlotText: {
    color: '#ffffff',
  },
  bookedSlotText: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  bookedLabel: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 2,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    elevation: 8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#2c6fad',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#cbd5e1',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SlotPickerScreen;
