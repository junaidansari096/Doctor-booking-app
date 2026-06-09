import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const DoctorProfileScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card / Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(doctor.name)}</Text>
          </View>
          <Text style={styles.nameText}>{doctor.name}</Text>
          <Text style={styles.specialityText}>{doctor.speciality}</Text>
          <Text style={styles.hospitalText}>{doctor.hospital}</Text>
          {doctor.availableToday && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Available Today</Text>
            </View>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Experience</Text>
            <Text style={styles.statVal}>{doctor.experience} yrs</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Patients</Text>
            <Text style={styles.statVal}>{doctor.totalPatients}+</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Rating</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.starText}>⭐</Text>
              <Text style={styles.statVal}>{doctor.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Consultation Fee Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Consultation Fee</Text>
          <Text style={styles.feeText}>₹{doctor.fee} (per visit)</Text>
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </View>
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    paddingBottom: 100, // Ensure content isn't covered by fixed footer
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#bfdbfe',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  specialityText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  hospitalText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065f46',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e2e8f0',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    marginRight: 3,
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  feeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  aboutText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
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
  bookButton: {
    backgroundColor: '#2c6fad',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DoctorProfileScreen;
