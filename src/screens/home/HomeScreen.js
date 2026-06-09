import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { dummyDoctors } from '../../data/dummyData';
import DoctorCard from '../../components/DoctorCard';

const SPECIALITIES = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'ENT Specialist',
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleChipPress = (speciality) => {
    if (selectedSpeciality === speciality) {
      setSelectedSpeciality(null); // Deselect if clicked again
    } else {
      setSelectedSpeciality(speciality);
    }
  };

  // Filter doctors based on selected speciality AND search query
  const filteredDoctors = dummyDoctors.filter((doctor) => {
    const matchesSpeciality =
      !selectedSpeciality || doctor.speciality === selectedSpeciality;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      doctor.name.toLowerCase().includes(query) ||
      doctor.speciality.toLowerCase().includes(query);

    return matchesSpeciality && matchesSearch;
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Top Welcome & Logout Row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greetingText}>Good morning,</Text>
          <Text style={styles.patientName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.logoutIconButton} onPress={handleLogout} activeOpacity={0.7}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Location Row */}
      <View style={styles.locationRow}>
        <Text style={styles.pinIcon}>📍</Text>
        <Text style={styles.locationText}>Pune, India</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors, specialities..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Speciality Chips Section */}
      <View style={styles.chipsSection}>
        <Text style={styles.sectionTitle}>Specialities</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {SPECIALITIES.map((speciality) => {
            const isSelected = selectedSpeciality === speciality;
            return (
              <TouchableOpacity
                key={speciality}
                style={[
                  styles.chip,
                  isSelected && styles.selectedChip,
                ]}
                onPress={() => handleChipPress(speciality)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.selectedChipText,
                  ]}
                >
                  {speciality}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Text style={styles.listSectionTitle}>
        {selectedSpeciality ? `${selectedSpeciality}s` : 'All Doctors'} ({filteredDoctors.length})
      </Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🩺</Text>
      <Text style={styles.emptyTitle}>No Doctors Found</Text>
      <Text style={styles.emptySubtitle}>
        Try modifying your search or clearing the filters.
      </Text>
      {(searchQuery || selectedSpeciality) && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearchQuery('');
            setSelectedSpeciality(null);
          }}
        >
          <Text style={styles.clearButtonText}>Clear All Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  patientName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  logoutIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ef4444',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pinIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  searchIcon: {
    fontSize: 16,
    color: '#94a3b8',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#0f172a',
    paddingVertical: 0,
  },
  chipsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  chipsScroll: {
    paddingRight: 20, // Padding for horizontal scroll bounds
  },
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  selectedChip: {
    backgroundColor: '#2c6fad',
    borderColor: '#1d4ed8',
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#ffffff',
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  clearButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  clearButtonText: {
    color: '#1d4ed8',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default HomeScreen;
