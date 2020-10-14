#!/usr/bin/perl

# Rotate Chinese (or any) text,
# from left-to-right, top-to-bottom reading order
# to top-to-bottom, right-to-left order.
#
# For example,
#
#   ABCDE
#   FGHIJ
#   KLMNO
#
# becomes
#
#   KFA
#   LGB
#   MHC
#   NID
#   OJE
#
# Running the program four times returns the text to its original order.
#
# usage:
#   perl poem.pl poem.txt
use 5.010;
use strict;
use warnings;
use open qw(:std :utf8); # this is required to read utf8 with <>

use Getopt::Std;

my %options=();
getopts("v:", \%options);

my $verbose = defined $options{v} ? $options{v} : 0;

my @chars;
my $num_lines;
my $num_chars = 0;

while (my $line = <>) {
    chomp $line;
    #$line =~ s/(\p{CJK_Unified_Ideographs})/<$1>/g;
    #$line =~ s/(.)/<$1>/g;
    my @line = split "", $line;
    push @chars, [@line];
    if ($num_chars != scalar @line) {
        if ($num_chars == 0) {
            $num_chars = scalar @line;
        } else {
            warn "lines are not all same length";
        }
    }
    #say join("*", @line);
}
$num_lines = scalar @chars;
#say $chars[0][$num_chars-1];
for my $i (0..$num_chars-1) {
    for my $j (reverse(0..$num_lines-1)) {
        print $chars[$j][$i];
    }
    print "\n";
}
